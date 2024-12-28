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

  setTimeout(() => {
    const cwd = path.join(__dirname, '../');

    console.log(`Pulling latest changes from GitHub in ${cwd}...`);

    childProcess.execSync('git reset --hard', {
      cwd,
      shell: 'bash',
    });

    childProcess.execSync('git pull', {
      cwd,
      shell: 'bash',
    });

    console.log('Installing dependencies...');

    childProcess.execSync('pnpm install', {
      cwd,
      shell: 'bash',
      env: {
        NODE_ENV: 'development',
      },
    });

    console.log('Building the app...');

    childProcess.execSync('pnpm build --sourcemap', {
      cwd,
      shell: 'bash',
      env: {
        NODE_ENV: 'production',
      },
    });

    // Prune the dependencies
    console.log('Pruning dependencies...');

    childProcess.execSync('pnpm prune --prod', {
      cwd,
      shell: 'bash',
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
