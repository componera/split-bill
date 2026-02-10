"use client";

import useSWR from "swr";

export default function BillDetails({ params }) {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/bills/${params.billId}`,
    (url) => fetch(url).then((r) => r.json()),
    {
      refreshInterval: 2000,
    },
  );

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Table {data.tableName}</h1>

      <img
        src={`${process.env.NEXT_PUBLIC_API}/qr/${data.restaurantId}/${data.id}`}
        className="mt-4"
      />

      <div className="mt-4">
        {data.items.map((item) => (
          <div key={item.id}>
            {item.name} - R{item.price} - {item.status}
          </div>
        ))}
      </div>
    </div>
  );
}
