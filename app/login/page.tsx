// app/auth/signin/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ExclamationTriangleIcon, CheckCircleIcon, BuildingOffice2Icon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
  const params = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState(null);

  const callbackUrl = params?.get('callbackUrl') || '/dashboard';
  const urlMessage = params?.get('message');
  const urlError = params?.get('error');

  useEffect(() => {
    if (urlMessage) setBanner({ type: 'success', text: urlMessage });
    if (urlError) {
      const map = {
        CredentialsSignin: 'Invalid email or password',
        AccountDisabled: 'Your account has been disabled. Please contact support.',
        AccessDenied: 'Access denied for this resource',
      };
      setBanner({ type: 'error', text: map[urlError] || 'Sign in error' });
    }
  }, [urlMessage, urlError]);

  function validate() {
    const e = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    await signIn('credentials', { email: form.email, password: form.password, callbackUrl, redirect: true });
    setBusy(false);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#dbeafe,_transparent_60%),radial-gradient(ellipse_at_bottom,_#eef2ff,_transparent_60%)]" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <aside className="hidden items-center justify-center lg:flex">
          <div className="mx-16 my-10 w-full max-w-md rounded-3xl bg-white/40 p-8 backdrop-blur-md ring-1 ring-white/40 shadow-2xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                <BuildingOffice2Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">Keralite Properties</p>
                <p className="text-xs text-gray-600">Real Estate CRM</p>
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900">Welcome back</h2>
            <p className="mb-6 text-gray-700">Manage properties, track leads, and close deals faster.</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> Intelligent matching</li>
              <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> Document automation</li>
              <li className="flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500" /> WhatsApp integration</li>
            </ul>
          </div>
        </aside>
        <main className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                <BuildingOffice2Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Keralite Properties</p>
                <p className="text-xs text-gray-600">Real Estate CRM</p>
              </div>
            </div>
            <div className="mb-6 rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md ring-1 ring-black/5">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">Sign in</h1>
              <p className="mb-6 text-sm text-gray-600">Access your dashboard.</p>
              {banner && (
                <div className={`mb-6 flex items-start gap-2 rounded-xl p-3 text-sm ${banner.type === 'success' ? 'bg-green-50 text-green-800 ring-1 ring-green-200' : 'bg-red-50 text-red-800 ring-1 ring-red-200'}`}>
                  {banner.type === 'success' ? <CheckCircleIcon className="mt-0.5 h-5 w-5 text-green-500" /> : <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 text-red-500" />}
                  <span>{banner.text}</span>
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email address</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      type="email"
                      className={`w-full rounded-xl border bg-white pl-10 pr-3 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-300 ring-1 ring-red-200 bg-red-50' : 'border-gray-300'}`}
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                  {errors.email && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><ExclamationTriangleIcon className="h-4 w-4" />{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      type={showPw ? 'text' : 'password'}
                      className={`w-full rounded-xl border bg-white pl-10 pr-10 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-300 ring-1 ring-red-200 bg-red-50' : 'border-gray-300'}`}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    />
                    <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" aria-label="Toggle password visibility">
                      {showPw ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><ExclamationTriangleIcon className="h-4 w-4" />{errors.password}</p>}
                </div>
                {/* <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    Remember me
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
                </div> */}
                <button type="submit" disabled={busy} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60">
                  {busy ? <span className="inline-flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Signing in…</span> : <>Sign in<ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-0.5" /></>}
                </button>
                <p className="text-center text-sm text-gray-600">Don&apos;t have an account? <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">Create one</Link></p>
              </form>
            </div>
            <div className="text-center text-sm text-gray-500"><Link href="/">← Back to home</Link></div>
          </div>
        </main>
      </div>
    </div>
  );
}
