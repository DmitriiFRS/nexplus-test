"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useDeleteView } from "@/features/views/model/useDeleteView";

interface Props {
	list: any[];
	tableName: "invoices" | "orders";
}

const VewList = ({ list, tableName }: Props) => {
	const { deletingId, handleDelete } = useDeleteView();

	return (
		<div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
			<h2 className="text-xl font-semibold text-white mb-4">{tableName} Views</h2>
			{list.length === 0 ? (
				<p className="text-neutral-500">Нет сохраненных видов</p>
			) : (
				<div className="flex flex-col gap-2">
					{list.map((view) => (
						<div key={view.id} className="relative flex group">
							<Link
								href={`/${tableName}?viewId=${view.id}`}
								className="flex-1 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg pr-12 text-white transition-colors"
							>
								{view.view_name}
							</Link>
							<button
								onClick={(e) => handleDelete(e, view.id)}
								disabled={deletingId === view.id}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-red-500 hover:bg-white/10 rounded-md transition-all disabled:opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100"
								title="Удалить"
							>
								{deletingId === view.id ? (
									<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M3 6h18"></path>
										<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
										<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
									</svg>
								)}
							</button>
						</div>
					))}
				</div>
			)}
			<Link href={`/${tableName}`} className="inline-block mt-4 text-blue-500 hover:underline">
				Перейти к таблице {tableName} &rarr;
			</Link>
		</div>
	);
};

export default VewList;
