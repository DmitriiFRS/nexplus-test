"use client";

import { useState, useRef, useEffect } from "react";
import { ColumnInfo } from "../model/useColumnsVisibility";

interface ColumnsVisibilityDropdownProps {
	columns: ColumnInfo[];
	onToggleColumn: (colId: string) => void;
}

export function ColumnsVisibilityDropdown({ columns, onToggleColumn }: ColumnsVisibilityDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-white/10 hover:bg-neutral-700 transition"
			>
				Колонки
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-white/10 rounded-xl shadow-lg z-50 p-2 max-h-96 overflow-y-auto">
					{columns.map((col) => (
						<label
							key={col.colId}
							className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-800 rounded-lg cursor-pointer text-sm text-white transition"
						>
							<input
								type="checkbox"
								checked={col.isVisible}
								onChange={() => onToggleColumn(col.colId)}
								className="w-4 h-4 rounded border-gray-600 bg-neutral-700 text-blue-500 focus:ring-blue-600 focus:ring-offset-neutral-900 cursor-pointer"
							/>
							<span className="truncate">{col.headerName}</span>
						</label>
					))}
					{columns.length === 0 && <div className="p-2 text-sm text-neutral-400 text-center">Нет колонок</div>}
				</div>
			)}
		</div>
	);
}
