// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';    
import { Admin } from '@/lib/models/Admin'; 

export async function POST(req) {
  await connectDB(); 

  try {
    const body = await req.json();
    const { name, email, mobile, password, confirmPassword } = body || {};

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: 'Name, email, password, and confirmPassword are required' }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    const emailTrim = String(email).trim().toLowerCase();
    const existing = await Admin.findOne({ email: emailTrim });
    if (existing) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name: String(name).trim(),
      email: emailTrim,
      mobile: mobile ? String(mobile).trim() : undefined,
      password: hash,
    });

    return NextResponse.json({ message: 'Admin successfully created', id: admin._id }, { status: 201 });
  } catch (error) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      return NextResponse.json({ message: `Duplicate ${field}` }, { status: 400 });
    }
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
