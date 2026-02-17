import Link from 'next/link';

interface Bill {
	id: string;
	status: string;
	total: number;
}

interface BillItemRowProps {
	bill: Bill;
	restaurantId?: string;
}

/**
 * Single row in BillTable - displays bill info with View link.
 * Link goes to /admin/bills/[billId].
 */
export default function BillItemRow({ bill }: BillItemRowProps) {
	return (
		<tr>
			<td className="p-2">{bill.id}</td>
			<td className="p-2">{bill.status}</td>
			<td className="p-2">R {bill.total.toFixed(2)}</td>
			<td className="p-2">
				<Link href={`/admin/bills/${bill.id}`} className="text-primary hover:underline">
					View
				</Link>
			</td>
		</tr>
	);
}
