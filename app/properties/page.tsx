// app/(dashboard)/properties/page.tsx
'use client';

import { useState } from 'react';
import type { Property, RequirementType } from '@/types/crm';

const transactionTypes: RequirementType[] = ['Rent', 'Sale', 'Lease'];

export default function PropertiesPage() {
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState<Property[]>([]);
  const [form, setForm] = useState<Property>({
    propertyId: '',
    transactionType: 'Rent',
    type: '',
    location: '',
    priceOrRent: 0,
    status: 'Available',
  });

  const addProperty = async () => {
    setRows((r) => [{ ...form, _id: String(Date.now()) }, ...r]);
    setShow(false);
  };

  return (
    <div className="space-y-4 bg-white h-screen">
      <div className="flex items-center justify-between p-7">
        <h2 className="text-lg font-semibold text-black">Properties</h2>
        <button onClick={() => setShow(true)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          Add Property
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Property ID</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Type</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Transaction</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Location</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Price/Rent</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-black">
            {rows.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-2">{p.propertyId}</td>
                <td className="px-4 py-2">{p.type}</td>
                <td className="px-4 py-2">{p.transactionType}</td>
                <td className="px-4 py-2">{p.location}</td>
                <td className="px-4 py-2">₹{p.priceOrRent.toLocaleString()}</td>
                <td className="px-4 py-2">{p.status}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No properties yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-3 text-base font-semibold text-black">Add Property</div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Property ID" value={form.propertyId} onChange={(e) => setForm({ ...form, propertyId: e.target.value })} />
              <select className="rounded-md border px-3 py-2 text-black" value={form.transactionType} onChange={(e) => setForm({ ...form, transactionType: e.target.value as RequirementType })}>
                {transactionTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Property type (e.g., 3BHK Apartment)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <input className="rounded-md border px-3 py-2 text-black" placeholder="Price / Rent" type="number" value={form.priceOrRent} onChange={(e) => setForm({ ...form, priceOrRent: Number(e.target.value) })} />
              <input className="rounded-md border px-3 py-2 md:col-span-2 text-black" placeholder="Furnishing (optional)" onChange={(e) => setForm({ ...form, furnishing: e.target.value })} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShow(false)} className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={addProperty} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
