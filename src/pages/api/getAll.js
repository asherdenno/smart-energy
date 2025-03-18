import { NextResponse } from 'next/server';
import fetchAll from '@/lib/db';

export async function GET() {
  try {
    const data = await fetchAll();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}