import * as process from 'node:process';
import toml from '@iarna/toml';
import path from 'path';
import fs from 'fs';

let _config: null | {
  apiKey: string;
  apiSecretKey: string;
  scopes: string[];
  appUrl: URL;
} = null;

export function getConfig() {
  if (_config) {
    return _config;
  }

  const shopifyAppTomlFile = process.env.NODE_ENV === 'production' ? 'shopify.app.prod.toml' : 'shopify.app.toml';

  console.log('Loading Shopify app config from', shopifyAppTomlFile);

  const shopifyAppToml = toml.parse(
    fs.readFileSync(path.resolve(__dirname, '../', shopifyAppTomlFile), 'utf-8'),
  ) as Record<string, any>;

  process.env.APP_URL = shopifyAppToml.application_url;

  _config = {
    apiKey: process.env.SHOPIFY_API_KEY!,
    apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
    scopes:
      shopifyAppToml.access_scopes?.scopes?.split(',') ?? process.env.SCOPES?.split(','),
    appUrl: new URL(
      shopifyAppToml.application_url ?? process.env.SHOPIFY_APP_URL ?? '',
    ),
  };

  console.log('Shopify app config:', _config);

  return _config;
}
