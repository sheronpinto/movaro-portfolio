import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'movaro';
const RESEND_API_KEY = process.env.RESEND_API_KEY || null;
const RECIPIENT = 'sheronpinto588@gmail.com';
const SUBJECT = 'New Portfolio Inquiry - Movaro';
const FROM = 'Movaro Portfolio <onboarding@resend.dev>';

let _clientPromise = null;
function getMongo() {
  if (!MONGO_URL) return null;
  if (!_clientPromise) {
    _clientPromise = new MongoClient(MONGO_URL).connect();
  }
  return _clientPromise;
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function handleContact(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name = '', email = '', projectType = '', message = '' } = body || {};
  if (!String(name).trim() || !String(email).trim() || !String(message).trim()) {
    return NextResponse.json(
      { error: 'Name, email and message are required.' },
      { status: 400 }
    );
  }

  const safeType = String(projectType || 'Not specified').trim() || 'Not specified';
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="font-size:22px;letter-spacing:0.04em;margin:0 0 8px;color:#fff;">New Portfolio Inquiry</h1>
      <p style="color:#BDBDBD;margin:0 0 24px;">Received via the MOVARO portfolio.</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#8E7B4B;width:140px;">Name</td><td style="color:#fff;">${esc(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#8E7B4B;">Email</td><td style="color:#fff;">${esc(email)}</td></tr>
        <tr><td style="padding:8px 0;color:#8E7B4B;">Project Type</td><td style="color:#fff;">${esc(safeType)}</td></tr>
      </table>
      <h2 style="font-size:14px;color:#8E7B4B;margin:24px 0 8px;letter-spacing:0.1em;text-transform:uppercase;">Message</h2>
      <p style="color:#fff;white-space:pre-wrap;line-height:1.6;">${esc(message)}</p>
    </div>
  `;

  const log = {
    id: crypto.randomUUID(),
    name,
    email,
    projectType: safeType,
    message,
    createdAt: new Date(),
    emailSent: false,
    emailError: null,
    resendConfigured: Boolean(resend)
  };

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: FROM,
        to: [RECIPIENT],
        replyTo: email,
        subject: SUBJECT,
        html
      });
      if (error) {
        log.emailError = { message: error.message || 'Resend error' };
      } else {
        log.emailSent = true;
        log.resendMessageId = data?.id || null;
      }
    } catch (e) {
      log.emailError = { message: e?.message || 'send failed' };
    }
  } else {
    log.emailError = { message: 'RESEND_API_KEY not configured' };
  }

  try {
    const cp = getMongo();
    if (cp) {
      const client = await cp;
      await client.db(DB_NAME).collection('contact_inquiries').insertOne(log);
    }
  } catch (e) {
    // Non-fatal — still acknowledge to the user
    console.error('Mongo log failed', e?.message);
  }

  return NextResponse.json({ success: true, emailSent: log.emailSent });
}

export async function GET(request, { params }) {
  const seg = (await params)?.path || [];
  if (seg.length === 0) {
    return NextResponse.json({ message: 'MOVARO API ready', version: '1.0' });
  }
  return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

export async function POST(request, { params }) {
  const seg = (await params)?.path || [];
  if (seg[0] === 'contact') return handleContact(request);
  return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}
