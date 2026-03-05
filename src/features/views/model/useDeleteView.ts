import { useState } from "react";
import { useRouter } from "next/navigation";

export const useDeleteView = () => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleDelete = async (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		e.stopPropagation();

		if (!window.confirm("Вы уверены, что хотите удалить этот вид?")) return;

		setDeletingId(id);
		try {
			const response = await fetch(`/api/views?id=${id}`, {
				method: "DELETE",
			});
			if (response.ok) {
				router.refresh();
			} else {
				alert("Ошибка при удалении");
			}
		} catch (error) {
			console.error("Delete error:", error);
			alert("Ошибка при удалении");
		} finally {
			setDeletingId(null);
		}
	};

	return {
		deletingId,
		handleDelete,
	};
};
