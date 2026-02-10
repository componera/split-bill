"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminPage() {
  const [bills, setBills] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/admin/bills?restaurantId=YOUR_RESTAURANT_ID")
      .then((res) => setBills(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Active Bills</h1>

      {bills.map((bill) => (
        <div key={bill.id}>
          Table {bill.tableNumber} — {bill.status}
        </div>
      ))}
    </div>
  );
}
