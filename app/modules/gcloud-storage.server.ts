import { Storage } from '@google-cloud/storage';

export const gcloudStorage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    type: 'service_account',
    project_id: process.env.GCLOUD_PROJECT_ID,
    private_key: process.env.GCLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    client_id: process.env.GCLOUD_CLIENT_ID,
  },
});
