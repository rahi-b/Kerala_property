// app/auth/signup/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BuildingOffice2Icon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErr('All required fields must be filled');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErr('Passwords do not match');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile || undefined,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data?.message || 'Registration failed');
        return;
      }
      router.push('/login?message=Account created successfully');
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#dcfce7,_transparent_60%),radial-gradient(ellipse_at_bottom,_#e0e7ff,_transparent_60%)]" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Brand side */}
        <aside className="hidden items-center justify-center lg:flex">
          <div className="mx-16 my-10 w-full max-w-md rounded-3xl bg-white/40 p-8 backdrop-blur-md ring-1 ring-white/40 shadow-2xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600">
                <BuildingOffice2Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">Keralite Properties</p>
                <p className="text-xs text-gray-600">Join Kerala’s network</p>
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900">
              Create your account
            </h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">1</span>
                Add your info
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">2</span>
                Secure account
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">3</span>
                Start matching
              </li>
            </ol>
          </div>
        </aside>

        {/* Form side */}
        <main className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600">
                <BuildingOffice2Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Keralite Properties</p>
                <p className="text-xs text-gray-600">Real Estate CRM</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md ring-1 ring-black/5">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">Create account</h1>
              <p className="mb-6 text-sm text-gray-600">Start your free trial.</p>

              {err && (
                <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
                  <ExclamationTriangleIcon className="mt-0.5 h-5 w-5" />
                  <span>{err}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Full name</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      className="w-full rounded-xl border bg-white pl-10 pr-3 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 border-gray-300"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      type="email"
                      className="w-full rounded-xl border bg-white pl-10 pr-3 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 border-gray-300"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mobile (optional)</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      inputMode="tel"
                      className="w-full rounded-xl border bg-white pl-10 pr-3 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 border-gray-300"
                      placeholder="9876543210"
                      value={form.mobile}
                      onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      type={showPw ? 'text' : 'password'}
                      className="w-full rounded-xl border bg-white pl-10 pr-10 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 border-gray-300"
                      placeholder="Minimum 8 chars, upper, lower, number"
                      value={form.password}
                      onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPw ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Use uppercase, lowercase, and a number</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Confirm password</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                      type={showPw2 ? 'text' : 'password'}
                      className="w-full rounded-xl border bg-white pl-10 pr-10 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 border-gray-300"
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw2((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showPw2 ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={busy}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:from-emerald-700 hover:to-blue-700 disabled:opacity-60"
                >
                  {busy ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating…
                    </span>
                  ) : (
                    <>
                      Create account
                      <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-emerald-700 hover:text-emerald-600">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              <Link href="/">← Back to home</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { BuildingOffice2Icon, UserIcon, EnvelopeIcon, PhoneIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowRightIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// export default function SignUpPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'agent', password: '', confirmPassword: '', agree: false });
//   const [errors, setErrors] = useState({});
//   const [busy, setBusy] = useState(false);
//   const [showPw, setShowPw] = useState(false);
//   const [showPw2, setShowPw2] = useState(false);

//   // function validate() {
//   //   const e = {};
//   //   if (!form.name.trim()) e.name = 'Name is required';
//   //   if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
//   //   if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid Indian number';
//   //   if (form.password.length < 8) e.password = 'Minimum 8 characters';
//   //   if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password)) e.password = 'Use upper, lower, number';
//   //   if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match';
//   //   if (!form.agree) e.agree = 'Please accept terms';
//   //   setErrors(e);
//   //   return Object.keys(e).length === 0;
//   // }

//   async function onSubmit(e) {
//     e.preventDefault();
//     // if (!validate()) return;
//     setBusy(true);
//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           phone: form.phone || undefined,
//           password: form.password,
//           confirmPassword: form.confirmPassword,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setErrors((p) => ({ ...p, email: data?.message || 'Registration failed' }));
//       } else {
//         router.push('/auth/signin?message=Account created successfully');
//       }
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#dcfce7,_transparent_60%),radial-gradient(ellipse_at_bottom,_#e0e7ff,_transparent_60%)]" />
//       <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
//       <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
//         <aside className="hidden items-center justify-center lg:flex">
//           <div className="mx-16 my-10 w-full max-w-md rounded-3xl bg-white/40 p-8 backdrop-blur-md ring-1 ring-white/40 shadow-2xl">
//             <div className="mb-8 flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600">
//                 <BuildingOffice2Icon className="h-7 w-7 text-white" />
//               </div>
//               <div>
//                 <p className="text-xl font-semibold text-gray-900">Keralite Properties</p>
//                 <p className="text-xs text-gray-600">Join Kerala’s network</p>
//               </div>
//             </div>
//             <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900">Create your account</h2>
//             <ol className="space-y-3 text-sm text-gray-700">
//               <li className="flex items-center gap-2"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">1</span> Add your info</li>
//               <li className="flex items-center gap-2"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">2</span> Secure account</li>
//               <li className="flex items-center gap-2"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">3</span> Start matching</li>
//             </ol>
//           </div>
//         </aside>
//         <main className="flex items-center justify-center px-6 py-16">
//           <div className="w-full max-w-md">
//             <div className="mb-8 flex items-center gap-3 lg:hidden">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600">
//                 <BuildingOffice2Icon className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-lg font-semibold text-gray-900">Keralite Properties</p>
//                 <p className="text-xs text-gray-600">Real Estate CRM</p>
//               </div>
//             </div>
//             <div className="rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md ring-1 ring-black/5">
//               <h1 className="mb-2 text-2xl font-semibold text-gray-900">Create account</h1>
//               <p className="mb-6 text-sm text-gray-600">Start your free trial.</p>
//               <form onSubmit={onSubmit} className="space-y-5">
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">Full name</label>
//                   <div className="relative">
//                     <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="h-5 w-5 text-gray-400" /></span>
//                     <input
//                       className={`w-full rounded-xl border bg-white pl-10 pr-3 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 ${errors.name ? 'border-red-300 ring-1 ring-red-200 bg-red-50' : 'border-gray-300'}`}
//                       placeholder="Jane Doe"
//                       value={form.name}
//                       onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//                     />
//                   </div>
//                   {errors.name && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><ExclamationTriangleIcon className="h-4 w-4" />{errors.name}</p>}
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">Email address</label>
//                   <div className="relative">
//                     <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><EnvelopeIcon className="h-5 w-5 text-gray-400" /></span>
//                     <input
//                       type="email"
//                       className={`w-full rounded-xl border bg-white pl-10 pr-3 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-300 ring-1 ring-red-200 bg-red-50' : 'border-gray-300'}`}
//                       placeholder="name@example.com"
//                       value={form.email}
//                       onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><ExclamationTriangleIcon className="h-4 w-4" />{errors.email}</p>}
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">Phone (optional)</label>
//                   <div className="relative">
//                     <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><PhoneIcon className="h-5 w-5 text-gray-400" /></span>
//                     <input
//                       inputMode="tel"
//                       className={`w-full rounded-xl border bg-white pl-10 pr-3 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 ${errors.phone ? 'border-red-300 ring-1 ring-red-200 bg-red-50' : 'border-gray-300'}`}
//                       placeholder="9876543210"
//                       value={form.phone}
//                       onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
//                     />
//                   </div>
//                   {errors.phone && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><ExclamationTriangleIcon className="h-4 w-4" />{errors.phone}</p>}
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
//                   <div className="relative">
//                     <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><LockClosedIcon className="h-5 w-5 text-gray-400" /></span>
//                     <input
//                       type={showPw ? 'text' : 'password'}
//                       className={`w-full rounded-xl border bg-white pl-10 pr-10 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 ${errors.password ? 'border-red-300 ring-1 ring-red-200 bg-red-50' : 'border-gray-300'}`}
//                       placeholder="Minimum 8 chars, upper, lower, number"
//                       value={form.password}
//                       onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
//                     />
//                     <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" aria-label="Toggle password visibility">
//                       {showPw ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                     </button>
//                   </div>
//                   {errors.password ? <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><ExclamationTriangleIcon className="h-4 w-4" />{errors.password}</p> : <p className="mt-1 text-xs text-gray-500">Use uppercase, lowercase, and a number</p>}
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">Confirm password</label>
//                   <div className="relative">
//                     <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><LockClosedIcon className="h-5 w-5 text-gray-400" /></span>
//                     <input
//                       type={showPw2 ? 'text' : 'password'}
//                       className={`w-full rounded-xl border bg-white pl-10 pr-10 py-3 text-black shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 ${errors.confirmPassword ? 'border-red-300 ring-1 ring-red-200 bg-red-50' : 'border-gray-300'}`}
//                       placeholder="Re-enter your password"
//                       value={form.confirmPassword}
//                       onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
//                     />
//                     <button type="button" onClick={() => setShowPw2((v) => !v)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" aria-label="Toggle confirm password visibility">
//                       {showPw2 ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && <p className="mt-1 flex items-center gap-1 text-sm text-red-600"><ExclamationTriangleIcon className="h-4 w-4" />{errors.confirmPassword}</p>}
//                 </div>
//                 <button type="submit" disabled={busy} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:from-emerald-700 hover:to-blue-700 disabled:opacity-60">
//                   {busy ? <span className="inline-flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Creating…</span> : <>Create account<ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-0.5" /></>}
//                 </button>
//                 <p className="text-center text-sm text-gray-600">Already have an account? <Link href="/login" className="font-medium text-emerald-700 hover:text-emerald-600">Sign in</Link></p>
//               </form>
//             </div>
//             <div className="mt-4 text-center text-sm text-gray-500"><Link href="/">← Back to home</Link></div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
