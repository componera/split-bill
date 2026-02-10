"use client";

import useSWR from "swr";

export default function PaymentsPage() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/admin/payments`,
    (url) => fetch(url).then((r) => r.json()),
    {
      refreshInterval: 5000,
    },
  );

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Payments</h1>

      {data.map((payment) => (
        <div key={payment.id} className="border p-4 mb-2">
          <div>Amount: R{payment.amount}</div>
          <div>Status: {payment.status}</div>
          <div>Bill: {payment.billId}</div>
        </div>
      ))}
    </div>
  );
}
