import Link from "next/link";

interface Bill {
	id: string;
	status: string;
	total: number;
}

interface BillItemRowProps {
	bill: Bill;
	restaurantId: string;
}

export default function BillItemRow({ bill, restaurantId }: BillItemRowProps) {
	return (
		<tr>
			<td className="p-2">{bill.id}</td>
			<td className="p-2">{bill.status}</td>
			<td className="p-2">R {bill.total.toFixed(2)}</td>
			<td className="p-2">
				<Link href={`/admin/${restaurantId}/bills/${bill.id}`} className="text-blue-600">
					View
				</Link>
			</td>
		</tr>
	);
}
