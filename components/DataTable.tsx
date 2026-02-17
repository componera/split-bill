'use client';

import { memo, ReactNode } from 'react';

interface Column<T> {
	key: string;
	header: string;
	render: (item: T) => ReactNode;
}

interface DataTableProps<T extends { id: string }> {
	columns: Column<T>[];
	data: T[];
	emptyMessage?: string;
}

/** Reusable data table - bills, payments, etc. Memoized for perf. */
function DataTableInner<T extends { id: string }>({ columns, data, emptyMessage = 'No data' }: DataTableProps<T>) {
	return (
		<table className="w-full border border-border rounded-lg overflow-hidden bg-card">
			<thead>
				<tr className="bg-muted/50">
					{columns.map(col => (
						<th key={col.key} className="p-3 text-left text-sm font-semibold text-foreground">
							{col.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.length === 0 ? (
					<tr>
						<td colSpan={columns.length} className="p-6 text-center text-muted-foreground">
							{emptyMessage}
						</td>
					</tr>
				) : (
					data.map(item => (
						<tr key={item.id} className="border-t border-border hover:bg-muted/30">
							{columns.map(col => (
								<td key={col.key} className="p-3">
									{col.render(item)}
								</td>
							))}
						</tr>
					))
				)}
			</tbody>
		</table>
	);
}

const DataTable = memo(DataTableInner) as typeof DataTableInner;
export default DataTable;
