
'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const nav = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/customers', label: 'Customers' },
  { href: '/properties', label: 'Properties' },
  { href: '/deals', label: 'Deals' },
  { href: '/reports', label: 'Reports' },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-white lg:block">
        <div className="p-6">
          <div className="mb-8">
            <div className="text-xl font-bold text-gray-900">Keralite Properties</div>
            <div className="text-xs text-gray-500">Real Estate CRM</div>
          </div>
          <nav className="space-y-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === n.href ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <div className="text-base font-semibold text-black">Dashboard</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.refresh()}
                className="rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Refresh
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
