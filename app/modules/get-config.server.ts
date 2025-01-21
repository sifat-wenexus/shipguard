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

  let shopifyAppToml: Record<string, any> | null = null;

  if (process.env.NODE_ENV !== 'production') {
    const files = ['../shopify.app.toml', '../shopify.app.prod.toml'];

    for (const file of files) {
      try {
        const content = fs.readFileSync(path.resolve(__dirname, file), 'utf8');
        shopifyAppToml = toml.parse(content) as Record<string, any>;
        break;
      } catch (e) {

      }
    }
  }

  _config = {
    apiKey: process.env.SHOPIFY_API_KEY!,
    apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
    scopes:
      shopifyAppToml?.scopes?.split(',') ?? process.env.SCOPES?.split(','),
    appUrl: new URL(
      shopifyAppToml?.application_url ?? process.env.SHOPIFY_APP_URL ?? ''
    ),
  };

  return _config;
}
