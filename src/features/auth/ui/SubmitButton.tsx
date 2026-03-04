"use client";

import React from "react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	loading?: boolean;
}

export function SubmitButton({ children, loading, ...props }: SubmitButtonProps) {
	return (
		<button
			{...props}
			disabled={loading || props.disabled}
			className={`relative w-full py-3.5 px-4 flex justify-center items-center rounded-xl bg-white text-black font-semibold overflow-hidden transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
				props.className || ""
			}`}
		>
			{loading ? (
				<span className="flex items-center gap-2">
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Загрузка...
				</span>
			) : (
				children
			)}
		</button>
	);
}
