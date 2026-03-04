import { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

export interface ColumnInfo {
	colId: string;
	headerName: string;
	isVisible: boolean;
}

export function useColumnsVisibility(gridRef: React.RefObject<AgGridReact | null>) {
	const [columns, setColumns] = useState<ColumnInfo[]>([]);

	const updateColumns = useCallback(() => {
		if (!gridRef?.current?.api) return;
		const api = gridRef.current.api;
		const colsData = api.getColumnState().map((colState) => {
			const colDef = api.getColumnDef(colState.colId);
			return {
				colId: colState.colId,
				headerName: colDef?.headerName || colState.colId,
				isVisible: !colState.hide,
			};
		});

		setColumns(colsData);
	}, [gridRef]);

	const toggleColumn = useCallback(
		(colId: string) => {
			if (!gridRef?.current?.api) return;
			const api = gridRef.current.api;
			const colState = api.getColumnState().find((s) => s.colId === colId);

			if (colState) {
				api.applyColumnState({ state: [{ colId, hide: !colState.hide }] });
				setTimeout(() => {
					updateColumns();
				}, 0);
			}
		},
		[gridRef, updateColumns]
	);

	return {
		columns,
		toggleColumn,
		updateColumns,
	};
}
