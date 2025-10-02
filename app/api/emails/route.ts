import { NextRequest, NextResponse } from 'next/server';
import { addEmail, getAllEmails } from '@/lib/deals';

export async function GET(request: NextRequest) {
  try {
    const emails = await getAllEmails();
    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, city } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const newEmail = await addEmail(email, city || '');
    return NextResponse.json({ email: newEmail }, { status: 201 });
  } catch (error) {
    console.error('Error adding email:', error);
    return NextResponse.json(
      { error: 'Failed to add email' },
      { status: 500 }
    );
  }
}
