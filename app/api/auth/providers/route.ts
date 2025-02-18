import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      twitch: {
        id: "twitch",
        name: "Twitch",
        type: "oauth",
        signinUrl: "/api/auth/signin/twitch",
        callbackUrl: "/api/auth/callback/twitch",
      }
    });
  } catch (error) {
    console.error('Failed to fetch providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}