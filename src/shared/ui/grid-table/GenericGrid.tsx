/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useGenericGrid, GridState } from "../../../features/views/useGenericGrid";
import { useCallback } from "react";

interface GenericGridProps {
	tableName: "invoices" | "orders";
	initialData: any[];
	columnDefs: ColDef[];
	onGridStateChange?: (state: GridState) => void;
	appliedState?: GridState | null;
	gridRef?: React.RefObject<any>;
	onGridReady?: () => void;
}

export function GenericGrid({
	tableName,
	initialData,
	columnDefs,
	onGridStateChange,
	appliedState,
	gridRef: externalGridRef,
	onGridReady: onGridReadyExternal,
}: GenericGridProps) {
	const { gridRef, rowData, handleColumnEvent, onFilterChanged, onSortChanged, onGridReady, clientColumnDefs, isLoading } = useGenericGrid(
		{
			tableName,
			columnDefs,
			initialData,
			onGridStateChange,
			appliedState,
			gridRef: externalGridRef,
		}
	);

	const handleGridReady = useCallback(() => {
		onGridReady(); // внутренний
		onGridReadyExternal?.(); // внешний
	}, [onGridReady, onGridReadyExternal]);

	return (
		<div className="relative ag-theme-quartz-dark " style={{ height: "600px", width: "100%" }}>
			<AgGridReact
				ref={gridRef}
				rowData={rowData}
				columnDefs={clientColumnDefs}
				onGridReady={handleGridReady}
				onFilterChanged={onFilterChanged}
				onSortChanged={onSortChanged}
				onColumnResized={handleColumnEvent}
				onColumnMoved={handleColumnEvent}
				onColumnVisible={handleColumnEvent}
				animateRows={true}
				rowSelection="multiple"
				suppressCellFocus={true}
				defaultColDef={{
					flex: 1,
					minWidth: 100,
					sortable: true,
					filter: true,
					resizable: true,
					cellDataType: false,
					filterParams: {
						debounceMs: 500,
					},
				}}
			/>
			{isLoading && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/50 backdrop-blur-[2px]">
					<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}
		</div>
	);
}
