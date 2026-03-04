import { ViewsManager } from "@/features/views/ViewsManager";
import { createClient } from "@/utils/supabase/server";
import { ColDef } from "ag-grid-community";
import { BackToDashboardButton } from "@/shared/ui/BackToDashboardButton";

const OrdersPage: React.FC = async () => {
	const supabase = await createClient();

	const { data: initialData, error } = await supabase.from("orders").select("*").order("order_date", { ascending: false });

	if (error) {
		return <div className="p-8 text-red-500">Ошибка загрузки данных: {error.message}</div>;
	}

	const orderColumnDefs: ColDef[] = [
		{ field: "order_id", headerName: "Order ID" },
		{ field: "customer_name", headerName: "Customer Name" },
		{ field: "customer_phone", headerName: "Phone", hide: true },
		{ field: "order_date", headerName: "Order Date", filter: "agDateColumnFilter" },
		{ field: "shipping_address", headerName: "Address", hide: true },
		{ field: "items_count", headerName: "Items Count", filter: "agNumberColumnFilter" },
		{ field: "subtotal", headerName: "Subtotal", hide: true },
		{ field: "shipping_cost", headerName: "Shipping Cost", hide: true },
		{ field: "discount", headerName: "Discount", hide: true },
		{ field: "total", headerName: "Total", filter: "agNumberColumnFilter" },
		{ field: "status", headerName: "Status" },
		{ field: "tracking_number", headerName: "Tracking Number" },
		{ field: "estimated_delivery", headerName: "Estimated Delivery", hide: true },
	];

	return (
		<div className="p-8">
			<div className="flex items-center gap-4 mb-6">
				<BackToDashboardButton />
				<h1 className="text-3xl font-bold text-white mb-0">Orders</h1>
			</div>
			<ViewsManager tableName="orders" initialData={initialData || []} columnDefs={orderColumnDefs} />
		</div>
	);
};

export default OrdersPage;
