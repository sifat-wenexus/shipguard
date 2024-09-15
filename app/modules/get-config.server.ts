import toml from '@iarna/toml';
import path from 'path';
import fs from 'fs';
import * as process from 'node:process';

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

  let shopifyAppToml: Record<string, any> | null = null;

  if (process.env.NODE_ENV !== 'production') {
    shopifyAppToml = toml.parse(
      fs.readFileSync(path.resolve(__dirname, '../shopify.app.toml'), 'utf8'),
    ) as Record<string, any>;

    process.env.APP_URL = shopifyAppToml?.application_url;
  }

  _config = {
    apiKey: process.env.SHOPIFY_API_KEY!,
    apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
    scopes:
      shopifyAppToml?.access_scopes?.scopes?.split(',') ?? process.env.SCOPES?.split(','),
    appUrl: new URL(
      shopifyAppToml?.application_url ?? process.env.SHOPIFY_APP_URL ?? '',
    ),
  };

  return _config;
}
