// components/KpiCard.tsx
import React from 'react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: 'emerald' | 'blue' | 'indigo' | 'orange';
}
export const KpiCard: React.FC<Props> = ({ title, value, subtitle, accent = 'emerald' }) => {
  const map = {
    emerald: 'from-emerald-500 to-green-600',
    blue: 'from-blue-500 to-sky-600',
    indigo: 'from-indigo-500 to-violet-600',
    orange: 'from-orange-500 to-amber-600',
  } as const;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-md bg-gradient-to-r ${map[accent]} px-2 py-1 text-xs font-semibold text-white`}>
        {title}
      </div>
      <div className="mt-3 text-3xl font-bold text-gray-900">{value}</div>
      {subtitle ? <div className="mt-1 text-sm text-gray-500">{subtitle}</div> : null}
    </div>
  );
};
