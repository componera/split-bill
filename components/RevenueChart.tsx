'use client';

import { useCallback, useEffect, useState } from 'react';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart } from 'recharts';
import { apiFetch } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useChartColors } from '@/hooks/useChartColors';

type ChartDataPoint = { date: string; revenue: number; payments: number; label: string };

/** Format date for chart labels (en-ZA locale) */
function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
}

/** Revenue & payments chart - last 7 days. Lazy-loads recharts. */
export default function RevenueChart() {
	const [data, setData] = useState<ChartDataPoint[]>([]);
	const [loading, setLoading] = useState(true);
	const colors = useChartColors();

	/** Normalize API date to YYYY-MM-DD for Map lookup */
	const normDate = useCallback((d: string) => (typeof d === 'string' ? d.split('T')[0] : String(d)), []);

	const fetchData = useCallback(async () => {
		try {
			const res = await apiFetch('/admin/chart-stats?days=7');
			const json = await res.json();
			const raw = Array.isArray(json) ? json : [];
			const byDate = new Map(raw.map((r: { date: string; revenue: number; payments: number }) => [normDate(r.date), r]));
			const days = 7;
			const points: ChartDataPoint[] = [];
			for (let i = days - 1; i >= 0; i--) {
				const d = new Date();
				d.setDate(d.getDate() - i);
				d.setHours(0, 0, 0, 0);
				const dateStr = d.toISOString().split('T')[0];
				const r = byDate.get(dateStr);
				points.push({
					date: dateStr,
					revenue: r?.revenue ?? 0,
					payments: r?.payments ?? 0,
					label: formatDate(dateStr),
				});
			}
			setData(points);
		} catch {
			setData([]);
		} finally {
			setLoading(false);
		}
	}, [normDate]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (loading) {
		return (
			<div className="rounded-xl border border-border bg-card/80 p-6 shadow-md backdrop-blur-sm">
				<Skeleton className="mb-4 h-6 w-48 bg-muted" />
				<div className="flex h-[320px] items-center justify-center rounded-lg bg-muted/30">
					<Skeleton className="h-3 w-full max-w-md bg-muted" />
				</div>
				<div className="mt-4 flex justify-center gap-6">
					<Skeleton className="h-3 w-16 bg-muted" />
					<Skeleton className="h-3 w-16 bg-muted" />
				</div>
			</div>
		);
	}

	if (!data.length) {
		return (
			<div className="flex h-[280px] items-center justify-center rounded-xl border border-border bg-card/80 text-muted-foreground">
				<p>No payment data for the last 7 days</p>
			</div>
		);
	}

	return (
		<div className="rounded-xl border border-border bg-card/80 p-6 shadow-md backdrop-blur-sm">
			<h3 className="mb-4 text-lg font-semibold text-foreground">Revenue & payments (last 7 days)</h3>
			<div className="h-[320px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor={colors.primary} stopOpacity={0.4} />
								<stop offset="100%" stopColor={colors.primary} stopOpacity={0.05} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
						<XAxis
							dataKey="label"
							tick={{ fill: colors.text, fontSize: 12 }}
							axisLine={{ stroke: colors.border }}
							tickLine={{ stroke: colors.border }}
						/>
						<YAxis
							yAxisId="revenue"
							orientation="left"
							tick={{ fill: colors.text, fontSize: 12 }}
							axisLine={{ stroke: colors.border }}
							tickLine={{ stroke: colors.border }}
							tickFormatter={v => `R ${v}`}
							width={55}
						/>
						<YAxis
							yAxisId="payments"
							orientation="right"
							tick={{ fill: colors.text, fontSize: 12 }}
							axisLine={{ stroke: colors.border }}
							tickLine={{ stroke: colors.border }}
							width={40}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: colors.card,
								border: `1px solid ${colors.border}`,
								borderRadius: '8px',
								boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
							}}
							labelStyle={{ color: colors.text, fontWeight: 600 }}
							formatter={(value, name) => {
								const v = value ?? 0;
								if (name === 'revenue') return [`R ${Number(v).toFixed(2)}`, 'Revenue'];
								if (name === 'payments') return [v, 'Payments'];
								return [v, String(name)];
							}}
							labelFormatter={label => label}
						/>
						<Area
							yAxisId="revenue"
							type="monotone"
							dataKey="revenue"
							stroke={colors.primary}
							strokeWidth={2}
							fill="url(#revenueGradient)"
						/>
						<Bar yAxisId="payments" dataKey="payments" fill={colors.secondary} radius={[4, 4, 0, 0]} fillOpacity={0.85} />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
			<div className="mt-4 flex items-center justify-center gap-6 text-sm">
				<span className="flex items-center gap-2">
					<span className="h-3 w-3 rounded-sm" style={{ backgroundColor: colors.primary }} />
					Revenue
				</span>
				<span className="flex items-center gap-2">
					<span className="h-3 w-3 rounded-sm" style={{ backgroundColor: colors.secondary }} />
					Payments
				</span>
			</div>
		</div>
	);
}
