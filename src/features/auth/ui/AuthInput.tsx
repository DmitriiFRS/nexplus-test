import React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ label, id, ...props }) => {
	return (
		<div className="space-y-1.5 flex flex-col items-start">
			<label className="text-sm font-medium text-neutral-300 ml-1" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				{...props}
				className="w-full px-4 py-3.5 bg-black/40 border border-white/5 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all font-medium"
			/>
		</div>
	);
};
