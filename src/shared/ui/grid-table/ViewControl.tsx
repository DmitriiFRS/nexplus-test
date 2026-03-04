"use client";

interface Props {
	activeViewId: string | null;
	handleSelectView: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	views: { id: string; view_name: string }[];
	handleSaveView: () => void;
	handleSaveAsNew: () => void;
	handleReset: () => void;
	isDirty: boolean;
}

export default function ViewControl({
	activeViewId,
	handleSelectView,
	views,
	handleSaveView,
	handleSaveAsNew,
	handleReset,
	isDirty,
}: Props) {
	return (
		<div className="flex items-center gap-4 bg-neutral-900 p-4 rounded-xl border border-white/10">
			<select
				value={activeViewId || ""}
				onChange={handleSelectView}
				className="bg-neutral-800 text-white p-2 rounded-lg border border-white/10 outline-none"
			>
				<option value="" disabled>
					Выберите вид
				</option>
				{views.map((v) => (
					<option key={v.id} value={v.id}>
						{v.view_name}
					</option>
				))}
			</select>

			<button
				onClick={handleSaveView}
				disabled={!isDirty || !activeViewId}
				className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
			>
				Save View
			</button>
			<button onClick={handleSaveAsNew} className="px-4 py-2 bg-neutral-700 text-white rounded-lg">
				Save As New View
			</button>
			<button onClick={handleReset} className="px-4 py-2 bg-red-900/50 text-white rounded-lg">
				Reset to Default
			</button>

			{isDirty && <span className="text-amber-400 text-sm font-medium ml-auto">Unsaved changes</span>}
		</div>
	);
}
