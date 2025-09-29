import clientPromise from '@/app/lib/mongodb';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

let sheets;
async function getSheetsClient() {
  if (sheets) return sheets;

  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  };

  if (!credentials.private_key || !credentials.client_email) {
    throw new Error("Missing service account credentials");
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { date, bureau, account, description, response, deadline, status } = body;

    if (!date || !bureau || !account || !description || !response || !deadline || !status) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('disputes');

    await collection.insertOne({
      date,
      bureau,
      account,
      description,
      response,
      deadline,
      status,
      createdAt: new Date()
    });

    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[date, bureau, account, description, response, deadline, status]],
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Add Dispute Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to add dispute' }), { status: 500 });
  }
}


export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('disputes');

    const disputes = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(disputes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Get Disputes Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch disputes' }), { status: 500 });
  }
}