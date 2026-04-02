import { google } from 'googleapis';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

let oauth2Client: InstanceType<typeof google.auth.OAuth2> | null = null;

function getOAuth2Client() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error(
      'Gmail OAuth not configured — set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN'
    );
  }

  if (!oauth2Client) {
    oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );
    oauth2Client.setCredentials({
      refresh_token: GOOGLE_REFRESH_TOKEN,
    });
  }

  return oauth2Client;
}

export async function getUncachableGmailClient() {
  const auth = getOAuth2Client();

  // Force token refresh to always have a valid access token
  await auth.getAccessToken();

  return google.gmail({ version: 'v1', auth });
}
