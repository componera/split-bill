/**
 * Unit tests for DataTable component
 */
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

describe('DataTable', () => {
	const columns = [
		{ key: 'id', header: 'ID', render: (r: { id: string }) => r.id },
		{ key: 'name', header: 'Name', render: (r: { id: string; name: string }) => r.name },
	];

	it('renders headers', () => {
		render(<DataTable columns={columns} data={[]} />);
		expect(screen.getByText('ID')).toBeInTheDocument();
		expect(screen.getByText('Name')).toBeInTheDocument();
	});

	it('renders empty message when no data', () => {
		render(<DataTable columns={columns} data={[]} emptyMessage="No items" />);
		expect(screen.getByText('No items')).toBeInTheDocument();
	});

	it('renders data rows', () => {
		const data = [
			{ id: '1', name: 'Item 1' },
			{ id: '2', name: 'Item 2' },
		];
		render(<DataTable columns={columns} data={data} />);
		expect(screen.getByText('Item 1')).toBeInTheDocument();
		expect(screen.getByText('Item 2')).toBeInTheDocument();
	});
});
