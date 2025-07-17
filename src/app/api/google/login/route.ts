import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // ví dụ: http://localhost:3000/api/google/callback
);

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export async function GET(req: NextRequest) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });

  return NextResponse.json({ authUrl });
}
