import React from "react";

interface Props {
	message?: string;
}

export const FormSuccess: React.FC<Props> = ({ message }) => {
	if (!message) return null;

	return (
		<div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-in fade-in zoom-in duration-500 flex flex-col items-center justify-center text-center space-y-3">
			<div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
				<svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<p className="text-emerald-400 font-medium">{message}</p>
		</div>
	);
};
