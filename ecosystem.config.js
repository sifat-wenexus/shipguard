const dotenv = require('dotenv');
const fs = require('fs');

module.exports = {
  apps: [
    {
      name: 'Sales & Discounts',
      exec_mode: 'fork',
      increment_var: 'PORT',
      script: './node_modules/@remix-run/serve/dist/cli.js',
      args: ['build/index.js'],
      instance_var: 'NODE_ID',
      source_map_support: true,
      env: dotenv.parse(fs.readFileSync('.env')),
      node_args: ['--inspect=127.0.0.1:7000'],
      log_file: './logs/combined.log',
      error_file: './logs/err.log',
    },
  ],
};
