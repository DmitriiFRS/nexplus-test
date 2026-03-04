/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback, useRef } from "react";
import { GridState } from "@/features/views/useGenericGrid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface ViewRecord {
	id: string;
	view_name: string;
	grid_state: GridState;
}

interface UseViewsManagerProps {
	tableName: "invoices" | "orders";
}

export function useViewsManager({ tableName }: UseViewsManagerProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const urlViewId = searchParams.get("viewId");

	const [views, setViews] = useState<ViewRecord[]>([]);
	const [activeViewId, setActiveViewId] = useState<string | null>(null);
	const [currentGridState, setCurrentGridState] = useState<GridState | null>(null);
	const [isDirty, setIsDirty] = useState(false);
	const [appliedState, setAppliedState] = useState<GridState | null>(null);

	const isInitialized = useRef(false);

	const loadViews = useCallback(async () => {
		const res = await fetch(`/api/views?tableName=${tableName}`);
		const { data } = await res.json();
		if (data) setViews(data);
	}, [tableName]);

	useEffect(() => {
		loadViews();
	}, [loadViews]);

	useEffect(() => {
		if (views.length > 0 && urlViewId && !isInitialized.current) {
			const viewToApply = views.find((v) => v.id === urlViewId);
			if (viewToApply) {
				setActiveViewId(viewToApply.id);
				setAppliedState(viewToApply.grid_state);
			}
			isInitialized.current = true;
		}
	}, [views, urlViewId]);

	useEffect(() => {
		if (!activeViewId || !currentGridState) {
			setIsDirty(false);
			return;
		}
		const activeView = views.find((v) => v.id === activeViewId);
		if (activeView) {
			const savedStateStr = JSON.stringify(activeView.grid_state);
			const currentStateStr = JSON.stringify(currentGridState);
			setIsDirty(savedStateStr !== currentStateStr);
		}
	}, [currentGridState, activeViewId, views]);

	const handleSaveView = async () => {
		if (!activeViewId || !currentGridState) return;
		await fetch("/api/views", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: activeViewId, gridState: currentGridState }),
		});
		setIsDirty(false);
		loadViews();
	};

	const handleSaveAsNew = async () => {
		if (!currentGridState) return;
		const viewName = prompt("Введите имя нового вида:");
		if (!viewName) return;

		const res = await fetch("/api/views", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ tableName, viewName, gridState: currentGridState }),
		});
		const { data } = await res.json();
		if (data) {
			setActiveViewId(data.id);
			router.push(`${pathname}?viewId=${data.id}`);
			loadViews();
		}
	};

	const handleSelectView = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.value;
		setActiveViewId(id);
		const view = views.find((v) => v.id === id);
		if (view) {
			setAppliedState(view.grid_state);
			router.push(`${pathname}?viewId=${id}`);
		}
	};

	const handleReset = () => {
		setAppliedState({});
		setActiveViewId(null);
		isInitialized.current = false;
		router.push(pathname);
	};

	return {
		views,
		activeViewId,
		isDirty,
		appliedState,
		handleSaveView,
		handleSaveAsNew,
		handleSelectView,
		handleReset,
		setCurrentGridState,
		currentGridState,
	};
}
