"use server";

import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import { ActionState } from "@/features/auth/types/auth.types";

export const signUp = async (prevState: ActionState, formData: FormData) => {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: { emailRedirectTo: `${origin}/api/auth/verify-email` },
	});

	if (error) {
		return { error: error.message };
	}

	return { success: "Cсылка для подтверждения отправлена на ваш email. Пожалуйста, проверьте почту!" };
};

export const signIn = async (prevState: ActionState, formData: FormData) => {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		return { error: error.message };
	}

	redirect("/");
};

export const signOut = async () => {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/login");
};
