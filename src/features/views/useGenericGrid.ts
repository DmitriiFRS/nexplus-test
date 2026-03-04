/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

export interface GridState {
	columnState?: any[];
	filterModel?: any;
	sortModel?: any[];
}

export interface UseGenericGridProps {
	tableName: "invoices" | "orders";
	columnDefs: any[];
	initialData: any[];
	onGridStateChange?: (state: GridState) => void;
	appliedState?: GridState | null;
	gridRef?: React.RefObject<any>;
}

export function useGenericGrid({
	tableName,
	columnDefs,
	initialData,
	onGridStateChange,
	appliedState,
	gridRef: externalGridRef,
}: UseGenericGridProps) {
	const internalGridRef = useRef<AgGridReact>(null);
	const gridRef = externalGridRef || internalGridRef;
	const [rowData, setRowData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);

	const fetchFilteredData = useCallback(async () => {
		if (!gridRef.current || !gridRef.current.api) return;

		const filterModel = gridRef.current.api.getFilterModel();
		const sortModel = gridRef.current.api
			.getColumnState()
			.filter((s: any) => s.sort != null)
			.map((s: any) => ({ colId: s.colId, sort: s.sort }));

		gridRef.current.api.showLoadingOverlay();

		setIsLoading(true);

		try {
			const response = await fetch(`/api/grid/${tableName}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ filterModel, sortModel }),
			});

			if (!response.ok) throw new Error("Ошибка загрузки данных");

			const { data } = await response.json();
			// debugger;
			// console.log("data", data);
			setRowData(data);
		} catch (error) {
			console.error(error);
		} finally {
			gridRef.current?.api?.hideOverlay();
			setIsLoading(false);
		}
	}, [tableName, gridRef]);

	useEffect(() => {
		if (!gridRef.current || !gridRef.current.api || !appliedState) return;
		const api = gridRef.current.api;
		if (appliedState.columnState) {
			api.applyColumnState({ state: appliedState.columnState, applyOrder: true });
		}
		if (appliedState.filterModel) {
			api.setFilterModel(appliedState.filterModel);
		} else {
			api.setFilterModel(null);
		}
		fetchFilteredData();
	}, [appliedState, fetchFilteredData, gridRef]);

	const extractAndEmitState = useCallback(() => {
		if (!gridRef.current || !gridRef.current.api) return;

		const columnState = gridRef.current.api.getColumnState();
		const filterModel = gridRef.current.api.getFilterModel();
		const sortModel = gridRef.current.api
			.getColumnState()
			.filter((s: any) => s.sort != null)
			.map((s: any) => ({ colId: s.colId, sort: s.sort }));

		if (onGridStateChange) {
			onGridStateChange({ columnState, filterModel, sortModel });
		}
	}, [onGridStateChange, gridRef]);

	const handleColumnEvent = useCallback(() => {
		extractAndEmitState();
	}, [extractAndEmitState]);

	const onFilterChanged = useCallback(() => {
		fetchFilteredData();
		extractAndEmitState();
	}, [fetchFilteredData, extractAndEmitState]);

	const onSortChanged = useCallback(() => {
		fetchFilteredData();
		extractAndEmitState();
	}, [fetchFilteredData, extractAndEmitState]);

	const onGridReady = useCallback(() => {
		extractAndEmitState();
	}, [extractAndEmitState]);

	const clientColumnDefs = useMemo(() => {
		return columnDefs.map((col) => {
			if (col.filter === "agDateColumnFilter") {
				return {
					...col,
					filterParams: {
						...col.filterParams,
						comparator: (filterLocalDateAtMidnight: Date, cellValue: string | null) => {
							if (cellValue == null) return -1;
							const dateAsString = cellValue.split("T")[0];
							const dateParts = dateAsString.split("-");
							const cellDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
							if (cellDate < filterLocalDateAtMidnight) return -1;
							if (cellDate > filterLocalDateAtMidnight) return 1;
							return 0;
						},
					},
				};
			}
			return col;
		});
	}, [columnDefs]);

	return {
		gridRef,
		rowData,
		clientColumnDefs,
		handleColumnEvent,
		onFilterChanged,
		onSortChanged,
		onGridReady,
		isLoading,
	};
}
