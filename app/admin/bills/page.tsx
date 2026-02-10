"use client";

import useSWR from "swr";

export default function BillsPage() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/admin/bills`,
    (url) => fetch(url).then((r) => r.json()),
    { refreshInterval: 2000 },
  );

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Active Bills</h1>

      {data.map((bill) => (
        <div key={bill.id} className="border p-4 mb-2 rounded">
          <div>Table: {bill.tableName}</div>
          <div>Total: R{bill.total}</div>

          <a href={`/admin/bills/${bill.id}`}>View</a>
        </div>
      ))}
    </div>
  );
}
