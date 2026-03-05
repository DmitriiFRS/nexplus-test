import VewList from "@/features/views/ui/dashboard/VewList";
import { createClient } from "@/utils/supabase/server";

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
				<VewList list={invoiceViews} tableName="invoices" />
				<VewList list={orderViews} tableName="orders" />
			</div>
		</div>
	);
}
