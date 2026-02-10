"use client";

import { useParams } from "next/navigation";
import { useBills } from "../hooks/useBills";
import { usePayments } from "../hooks/usePayments";

export default function DashboardPage() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;

  const { bills } = useBills(restaurantId);
  const { payments } = usePayments(restaurantId);

  const revenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card title="Active Bills" value={bills.length} />

        <Card title="Payments" value={payments.length} />

        <Card title="Revenue" value={`R ${revenue}`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
