/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GenericGrid } from "@/shared/ui/grid-table/GenericGrid";
import { useViewsManager } from "./useViewsManager";
import ViewControl from "@/shared/ui/grid-table/ViewControl";

interface ViewsManagerProps {
	tableName: "invoices" | "orders";
	initialData: any[];
	columnDefs: any[];
}

export function ViewsManager({ tableName, initialData, columnDefs }: ViewsManagerProps) {
	const {
		views,
		activeViewId,
		isDirty,
		appliedState,
		handleSaveView,
		handleSaveAsNew,
		handleSelectView,
		handleReset,
		setCurrentGridState,
	} = useViewsManager({ tableName });

	return (
		<div className="space-y-4">
			<ViewControl
				activeViewId={activeViewId}
				handleSelectView={handleSelectView}
				views={views}
				handleSaveView={handleSaveView}
				handleSaveAsNew={handleSaveAsNew}
				handleReset={handleReset}
				isDirty={isDirty}
			/>
			<GenericGrid
				tableName={tableName}
				initialData={initialData}
				columnDefs={columnDefs}
				onGridStateChange={setCurrentGridState}
				appliedState={appliedState}
			/>
		</div>
	);
}
