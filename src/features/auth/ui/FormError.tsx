import React from "react";

interface FormErrorProps {
	message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
	if (!message) return null;

	return (
		<div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
			<p className="text-sm text-red-400 text-center font-medium">{message}</p>
		</div>
	);
};
