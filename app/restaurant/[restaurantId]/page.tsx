"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { socket } from "@/lib/socket";

export default function BillPage({ params }: { params: { billId: string } }) {
  const [bill, setBill] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const loadBill = async () => {
    const res = await api.get(`/bills/${params.billId}`);
    setBill(res.data);
  };

  useEffect(() => {
    loadBill();

    socket.emit("joinBill", params.billId);

    socket.on("billUpdated", loadBill);

    return () => {
      socket.off("billUpdated");
    };
  }, []);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((i) => i !== itemId)
        : [...prev, itemId],
    );
  };

  const pay = async () => {
    const res = await api.post("/payments/create", {
      billId: bill.id,
      restaurantId: bill.restaurantId,
      itemIds: selectedItems,
    });

    window.location.href = res.data.checkoutUrl;
  };

  if (!bill) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Table {bill.tableNumber}</h1>

      <h2>Status: {bill.status}</h2>

      <ul>
        {bill.items.map((item: any) => (
          <li key={item.id}>
            {!item.paid && (
              <input type="checkbox" onChange={() => toggleItem(item.id)} />
            )}
            {item.name} — R{item.price} x {item.quantity}
            {item.paid && <strong> PAID</strong>}
          </li>
        ))}
      </ul>

      <button disabled={selectedItems.length === 0} onClick={pay}>
        Pay Selected Items
      </button>

      <h3>Total: R{bill.totalAmount}</h3>
      <h3>Paid: R{bill.paidAmount}</h3>
      <h3>Remaining: R{bill.remainingAmount}</h3>
    </div>
  );
}
