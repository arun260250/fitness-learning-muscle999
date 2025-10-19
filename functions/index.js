// Cloud Function sample: onCreate user -> append to Google Sheet (example)
/*
const functions = require('firebase-functions');
const { google } = require('googleapis');

const SHEET_ID = process.env.SHEET_ID;
const KEY = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

const jwtClient = new google.auth.JWT(
  KEY.client_email,
  null,
  KEY.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth: jwtClient });

exports.onNewUser = functions.auth.user().onCreate(async (user) => {
  const values = [[user.uid, user.displayName || "", user.email || "", new Date().toISOString()]];
  await jwtClient.authorize();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A:D',
    valueInputOption: 'RAW',
    requestBody: { values }
  });
});
*/
