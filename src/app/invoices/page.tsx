import { ViewsManager } from "@/features/views/ViewsManager";
import { createClient } from "@/utils/supabase/server";
import { ColDef } from "ag-grid-community";
import { BackToDashboardButton } from "@/shared/ui/BackToDashboardButton";

const InvoicesPage: React.FC = async () => {
	const supabase = await createClient();

	const { data: initialData, error } = await supabase.from("invoices").select("*").order("invoice_date", { ascending: false });

	if (error) {
		return <div className="p-8 text-red-500">Ошибка загрузки данных: {error.message}</div>;
	}

	const invoiceColumnDefs: ColDef[] = [
		{ field: "invoice_id", headerName: "Invoice ID" },
		{ field: "customer_name", headerName: "Customer Name" },
		{ field: "customer_email", headerName: "Email", hide: true },
		{ field: "invoice_date", headerName: "Invoice Date", filter: "agDateColumnFilter" },
		{ field: "due_date", headerName: "Due Date", filter: "agDateColumnFilter" },
		{ field: "amount", headerName: "Amount", hide: true, filter: "agNumberColumnFilter" },
		{ field: "tax", headerName: "Tax", hide: true, filter: "agNumberColumnFilter" },
		{ field: "total", headerName: "Total", filter: "agNumberColumnFilter" },
		{ field: "status", headerName: "Status" },
		{ field: "payment_method", headerName: "Payment Method", hide: true },
		{ field: "notes", headerName: "Notes", hide: true },
	];

	return (
		<div className="p-8">
			<div className="flex items-center gap-4 mb-6">
				<BackToDashboardButton />
				<h1 className="text-3xl font-bold text-white mb-0">Invoices</h1>
			</div>
			<ViewsManager tableName="invoices" initialData={initialData || []} columnDefs={invoiceColumnDefs} />
		</div>
	);
};

export default InvoicesPage;
