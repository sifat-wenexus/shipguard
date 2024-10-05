#!/usr/bin/env -S node -r esbuild-register --enable-source-maps --watch

import process from 'node:process';
import fs from 'node:fs/promises';
import toml from '@iarna/toml';
import dotenv from 'dotenv';
import net from 'node:net';
import path from 'path';

dotenv.config();

async function run() {
  const { Client } = require('./tunnel-client');
  const remix = require('@remix-run/dev');

  remix.cli.run(['dev']);

  await new Promise<void>((resolve) => {
    let checking = false;

    const intervalId = setInterval(() => {
      if (checking) {
        return;
      }

      checking = true;
      const socket = new net.Socket();

      socket.once('error', () => {
        checking = false;
        socket.destroy();
      });
      socket.once('connect', () => {
        clearInterval(intervalId);
        socket.destroy();

        setTimeout(resolve, 3000);
      });
      socket.connect({ host: 'localhost', port: Number(process.env.PORT || 3000) });
    }, 500);
  });

  const config = toml.parse(
    await fs.readFile(path.resolve(__dirname, '../shopify.app.toml'), 'utf-8'),
  );

  const url = new URL(config.application_url as string);

  await new Client({
    tunnelURL: new URL(`wss://tunnel.wenexus.io?channel=meta&domain=${url.hostname.split('.')[0]}`),
    routerOrTarget: new URL(`http://localhost:${process.env.PORT || 3000}`),
  }).ready;

}

run();

