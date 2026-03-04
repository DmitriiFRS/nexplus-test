"use client";

import { signOut } from "@/actions/auth";
import { useState } from "react";

export function LogoutButton() {
	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await signOut();
		} catch (error) {
			console.error("Logout error:", error);
			setIsLoading(false);
		}
	};

	return (
		<button
			onClick={handleLogout}
			disabled={isLoading}
			className="px-4 py-2 text-sm font-medium text-white bg-red-400 hover:bg-red-500 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
		>
			{isLoading ? (
				<span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
			) : (
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
			)}
			Выйти
		</button>
	);
}
