import type { ActionFunctionArgs } from '@remix-run/node';
import childProcess from 'child_process';
import path from 'path';

export async function action({ request }: ActionFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.GITHUB_WEBHOOK_SECRET) {
    console.error('Unauthorized request to deploy endpoint');
    return new Response('Unauthorized', { status: 401 });
  }

  setTimeout(async () => {
    const execa = await import('execa');
    const cwd = path.join(__dirname, '../');

    console.log(`Pulling latest changes from GitHub in ${cwd}...`);

    execa.execaSync('git', ['reset', '--hard'], {
      cwd,
      shell: true,
      stdio: 'inherit',
    });
    execa.execaSync('git', ['pull'], { cwd, shell: true, stdio: 'inherit' });

    console.log('Installing dependencies...');

    execa.execaSync('pnpm', ['install'], {
      cwd,
      shell: true,
      stdio: 'inherit',
      env: {
        NODE_ENV: 'development',
      },
    });

    console.log('Building the app...');

    execa.execaSync('pnpm', ['build', '--sourcemap'], {
      cwd,
      shell: true,
      stdio: 'inherit',
      env: { NODE_ENV: 'production' },
    });

    // Prune the dependencies
    console.log('Pruning dependencies...');

    execa.execaSync('pnpm', ['prune', '--prod'], {
      cwd,
      shell: true,
      stdio: 'inherit',
      env: { NODE_ENV: 'production' },
    });

    console.log('Restarting the server...');

    childProcess
      .spawn('pm2', ['restart', './ecosystem.config.js'], {
        cwd,
        detached: true,
        shell: 'bash',
        stdio: 'ignore',
      })
      .unref();
  }, 1000);

  return new Response('', { status: 200 });
}
