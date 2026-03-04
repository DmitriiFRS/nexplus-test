import Link from "next/link";
import { FC } from "react";

interface BackToDashboardButtonProps {
	className?: string;
}

export const BackToDashboardButton: FC<BackToDashboardButtonProps> = ({ className = "" }) => {
	return (
		<Link
			href="/"
			className={`px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors border border-white/10 ${className}`}
		>
			&larr; Назад
		</Link>
	);
};
