'use client';

import { KpiCard } from '@/components/KpiCard';

export default function DashboardPage() {
  const kpis = [
    { title: 'Properties', value: 128, subtitle: 'Available across Kerala', accent: 'emerald' as const },
    { title: 'Customers', value: 412, subtitle: 'Active leads in pipeline', accent: 'blue' as const },
    { title: 'Conversion', value: '23%', subtitle: 'Last 30 days', accent: 'indigo' as const },
    { title: 'Revenue', value: '₹1.2Cr', subtitle: 'YTD Rent/Sale/Lease', accent: 'orange' as const },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.title} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-gray-800">Deals Pipeline</div>
          <div className="text-sm text-gray-500">Enquiry → Site Visit → Negotiation → Agreement → Closed</div>
          <div className="mt-4 h-52 rounded-lg bg-gray-50" />
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-gray-800">Leads by Source</div>
          <div className="mt-4 h-52 rounded-lg bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
