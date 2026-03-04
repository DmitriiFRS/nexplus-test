import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
	const supabase = await createClient();

	const { data: views, error } = await supabase.from("views").select("*").order("created_at", { ascending: false });

	if (error) {
		return <div className="p-8 text-red-500">Ошибка загрузки видов: {error.message}</div>;
	}
	const invoiceViews = views?.filter((v) => v.table_name === "invoices") || [];
	const orderViews = views?.filter((v) => v.table_name === "orders") || [];

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
					<h2 className="text-xl font-semibold text-white mb-4">Invoices Views</h2>
					{invoiceViews.length === 0 ? (
						<p className="text-neutral-500">Нет сохраненных видов</p>
					) : (
						<div className="flex flex-col gap-2">
							{invoiceViews.map((view) => (
								<Link
									key={view.id}
									href={`/invoices?viewId=${view.id}`}
									className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white transition-colors"
								>
									{view.view_name}
								</Link>
							))}
						</div>
					)}
					<Link href="/invoices" className="inline-block mt-4 text-blue-500 hover:underline">
						Перейти к таблице Invoices &rarr;
					</Link>
				</div>
				<div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
					<h2 className="text-xl font-semibold text-white mb-4">Orders Views</h2>
					{orderViews.length === 0 ? (
						<p className="text-neutral-500">Нет сохраненных видов</p>
					) : (
						<div className="flex flex-col gap-2">
							{orderViews.map((view) => (
								<Link
									key={view.id}
									href={`/orders?viewId=${view.id}`}
									className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white transition-colors"
								>
									{view.view_name}
								</Link>
							))}
						</div>
					)}
					<Link href="/orders" className="inline-block mt-4 text-blue-500 hover:underline">
						Перейти к таблице Orders &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
}
