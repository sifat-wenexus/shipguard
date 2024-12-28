const cpus = require('os').cpus().length;
const dotenv = require('dotenv');
const fs = require('fs');

module.exports = {
  apps: [
    {
      name: 'Shipping Protection',
      exec_mode: 'fork',
      increment_var: 'PORT',
      script: './node_modules/.bin/remix-serve build/index.js',
      instances: cpus < 2 ? 2 : cpus,
      instance_var: 'NODE_ID',
      source_map_support: true,
      env: dotenv.parse(fs.readFileSync('.env')),
    },
  ],
};
