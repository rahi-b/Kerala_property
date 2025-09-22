// app/(dashboard)/customers/page.tsx
'use client';

import { useState } from 'react';
import type { Customer, RequirementType } from '@/types/crm';

const requirementTypes: RequirementType[] = ['Rent', 'Sale', 'Lease'];

export default function CustomersPage() {
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState<Customer[]>([]);
  const [form, setForm] = useState<Customer>({
    name: '',
    requirementType: 'Rent',
    propertyType: '',
    budgetMin: undefined,
    budgetMax: undefined,
    preferredLocations: [],
    furnishing: '',
    notes: '',
  });

  const addCustomer = async () => {
    setRows((r) => [{ ...form, _id: String(Date.now()) }, ...r]);
    setShow(false);
  };

  return (
    <div className="space-y-4 bg-white h-screen">
      <div className="flex items-center justify-between p-7">
        <h2 className="text-lg font-semibold text-black">Customers</h2>
        <button onClick={() => setShow(true)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          Add Customer
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Requirement</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Property Type</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Budget</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Locations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-black">
            {rows.map((c) => (
              <tr key={c._id}>
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.requirementType}</td>
                <td className="px-4 py-2">{c.propertyType}</td>
                <td className="px-4 py-2">
                  {c.budgetMin ? `₹${c.budgetMin.toLocaleString()}` : '-'} — {c.budgetMax ? `₹${c.budgetMax.toLocaleString()}` : '-'}
                </td>
                <td className="px-4 py-2">{c.preferredLocations?.join(', ')}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No customers yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-3 text-base font-semibold text-black">Add Customer</div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <select className="rounded-md border px-3 py-2 text-black" value={form.requirementType} onChange={(e) => setForm({ ...form, requirementType: e.target.value as RequirementType })}>
                {requirementTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Property type (e.g., 3BHK Apartment)" value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })} />
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Preferred locations (comma separated)" onChange={(e) => setForm({ ...form, preferredLocations: e.target.value.split(',').map((s) => s.trim()) })} />
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Budget min" type="number" onChange={(e) => setForm({ ...form, budgetMin: Number(e.target.value) })} />
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Budget max" type="number" onChange={(e) => setForm({ ...form, budgetMax: Number(e.target.value) })} />
              <input className="rounded-md border px-3 py-2 md:col-span-2 text-black" placeholder="Furnishing (e.g., Semi-furnished)" onChange={(e) => setForm({ ...form, furnishing: e.target.value })} />
              <textarea className="rounded-md border px-3 py-2 md:col-span-2 text-black" placeholder="Notes" onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShow(false)} className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={addCustomer} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
