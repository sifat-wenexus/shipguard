import { getGoogleAuthClient } from '~/modules/get-google-auth-client.server';
import type { gmail_v1} from 'googleapis';
import { google } from 'googleapis';
import { getGoogleUserInfo } from '~/modules/get-google-user-info.server';

export interface GmailSendEmailOptions {
  to: string;
  subject: string;
  body: string;
}

export class GmailAPI {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly storeId: string) {
  }

  private _client: gmail_v1.Gmail | null = null;

  async getGmailApi() {
    if (this._client) {
      return this._client;
    }

    const authClient = await getGoogleAuthClient(this.storeId);

    if (!authClient) {
      return null;
    }

    const client = google.gmail({
      version: 'v1',
      auth: authClient,
    });

    this._client = client;

    return client;
  }

  async sendEmail(options: GmailSendEmailOptions) {
    const userInfo = await getGoogleUserInfo(this.storeId);
    const client = await this.getGmailApi();

    if (!client || !userInfo) {
      return;

    }

    const message = [
      `To: ${options.to}`,
      `From: ${userInfo.name} <${userInfo.email}>`,
      `Subject: ${options.subject}`,
      'MIME-Version: 1.0',
      'Content-type: text/html; charset=iso-8859-1',
      '',
      options.body,
    ];

    await client.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(message.join('\r\n').trim()).toString('base64'),
      },
    });
  }
}
