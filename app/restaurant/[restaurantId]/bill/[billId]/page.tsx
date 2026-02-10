"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { socket } from "@/lib/socket";

export default function BillPage({
  params,
}: {
  params: {
    restaurantId: string;
    billId: string;
  };
}) {
  const { restaurantId, billId } = params;

  const [bill, setBill] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const loadBill = async () => {
    const res = await api.get(`/restaurants/${restaurantId}/bills/${billId}`);

    setBill(res.data);
  };

  useEffect(() => {
    loadBill();

    socket.emit("joinBill", billId);

    socket.on("billUpdated", loadBill);

    return () => socket.off("billUpdated");
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
      restaurantId,
      billId,
      itemIds: selectedItems,
    });

    window.location.href = res.data.checkoutUrl;
  };

  if (!bill) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Restaurant: {restaurantId}</h1>
      <h2>Table: {bill.tableNumber}</h2>

      <ul>
        {bill.items.map((item: any) => (
          <li key={item.id}>
            {!item.paid && (
              <input type="checkbox" onChange={() => toggleItem(item.id)} />
            )}
            {item.name} — R{item.price}
            {item.paid && <strong> PAID</strong>}
          </li>
        ))}
      </ul>

      <button disabled={!selectedItems.length} onClick={pay}>
        Pay Selected Items
      </button>
    </div>
  );
}
