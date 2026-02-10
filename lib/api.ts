import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function fetchBill(restaurantId: string, billId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${restaurantId}/bills/${billId}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch bill");

  return res.json();
}

export async function payItems(
  restaurantId: string,
  billId: string,
  itemIds: string[],
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      restaurantId,
      billId,
      itemIds,
    }),
  });

  return res.json();
}
