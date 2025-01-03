const dotenv = require('dotenv');
const fs = require('fs');

module.exports = {
  apps: [
    {
      name: 'Shipping Protection',
      exec_mode: 'fork',
      increment_var: 'PORT',
      script: './node_modules/.bin/remix-serve build/index.js',
      instance_var: 'NODE_ID',
      source_map_support: true,
      env: dotenv.parse(fs.readFileSync('.env')),
      node_args: ['--inspect=7000'],
    },
  ],
};
