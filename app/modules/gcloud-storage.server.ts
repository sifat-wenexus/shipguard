import { Storage } from '@google-cloud/storage';

export const gcloudStorage = new Storage({
  projectId: process.env.GC_PROJECT_ID,
  credentials: {
    type: 'service_account',
    project_id: process.env.GC_PROJECT_ID,
    private_key: process.env.GC_STORAGE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GC_STORAGE_USER_ID,
    client_id: process.env.GC_STORAGE_CLIENT_ID,
  },
});
