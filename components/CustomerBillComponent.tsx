"use client";

import { useEffect, useState } from "react";
import { fetchBill, payItems } from "@/lib/api";
import { useBillSocket } from "@/hooks/useBillSocket";

interface Props {
	restaurantId: string;
	billId: string;
}

export default function CustomerBill({ billId }: Props) {
	const [bill, setBill] = useState<any>(null);
	const [selected, setSelected] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let isMounted = true; // prevent state update if unmounted

		async function fetchData() {
			try {
				const data = await fetchBill(billId);
				if (isMounted) setBill(data); // safe
			} catch (err) {
				console.error("Failed to load bill", err);
			}
		}

		fetchData();

		return () => {
			isMounted = false; // cleanup
		};
	}, [billId]);

	useBillSocket(billId, updatedBill => {
		setBill(updatedBill);
		setSelected([]);
	});

	function toggleItem(itemId: string) {
		setSelected(prev => (prev.includes(itemId) ? prev.filter(i => i !== itemId) : [...prev, itemId]));
	}

	async function handlePay() {
		setLoading(true);

		await payItems(billId, selected);

		setLoading(false);
	}

	if (!bill) return <div className="p-6">Loading...</div>;

	const unpaidItems = bill.items.filter((i: any) => i.status === "UNPAID");

	const total = unpaidItems.reduce((sum: number, item: any) => sum + Number(item.price), 0);

	const selectedTotal = bill.items
		.filter((i: any) => selected.includes(i.id))
		.reduce((sum: number, item: any) => sum + Number(item.price), 0);

	return (
		<div className="max-w-xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Table Bill</h1>

			<div className="space-y-3">
				{bill.items.map((item: any) => (
					<div
						key={item.id}
						className={`flex justify-between p-3 border rounded
              ${item.status === "PAID" ? "bg-green-100" : "bg-white"}`}>
						<div>
							<p className="font-medium">{item.name}</p>

							<p className="text-sm text-gray-500">R{item.price}</p>
						</div>

						{item.status === "UNPAID" && (
							<input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleItem(item.id)} />
						)}

						{item.status === "PAID" && <span className="text-green-600 font-semibold">Paid</span>}
					</div>
				))}
			</div>

			<div className="mt-6">
				<p className="text-lg font-semibold">Selected: R{selectedTotal}</p>

				<p className="text-sm text-gray-500">Remaining: R{total}</p>
			</div>

			<button
				disabled={selected.length === 0 || loading}
				onClick={handlePay}
				className="mt-4 w-full bg-black text-white p-3 rounded disabled:bg-gray-400">
				{loading ? "Processing..." : "Pay Selected Items"}
			</button>
		</div>
	);
}
