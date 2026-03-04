"use client";

import { useActionState } from "react";
import { signUp } from "../../../actions/auth";
import { SubmitButton } from "./SubmitButton";
import { AuthInput } from "./AuthInput";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import Link from "next/link";
import { ActionState } from "../types/auth.types";

const initialState: ActionState = {
	error: "",
	success: "",
};

export function RegisterForm() {
	const [state, formAction, isPending] = useActionState(signUp, initialState);

	return (
		<div className="w-full max-w-md mx-auto p-8 rounded-4xl bg-neutral-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.8)] transition-all duration-500 relative overflow-hidden">
			<div className="absolute top-0 inset-x-0 h-40 bg-linear-to-b from-purple-500/20 to-transparent blur-3xl -z-10 rounded-t-4xl"></div>

			<div className="mb-8 text-center mt-2">
				<h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Создать аккаунт</h2>
			</div>

			{state?.success ? (
				<div className="py-6">
					<FormSuccess message={state.success} />
					<div className="mt-8 text-center">
						<Link
							href="/login"
							className="inline-flex w-full justify-center items-center py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
						>
							Вернуться ко входу
						</Link>
					</div>
				</div>
			) : (
				<form action={formAction} className="space-y-5">
					<div className="space-y-4">
						<AuthInput id="email" name="email" type="email" required label="Email" placeholder="name@example.com" />
						<AuthInput id="password" name="password" type="password" required minLength={6} label="Пароль" placeholder="••••••••" />
					</div>
					<FormError message={state?.error} />
					<div className="pt-2">
						<SubmitButton loading={isPending}>Зарегистрироваться</SubmitButton>
					</div>
					<p className="text-center text-sm text-neutral-400 pt-4">
						Уже есть аккаунт?{" "}
						<Link
							href="/login"
							className="text-white hover:text-neutral-200 font-semibold transition-colors underline-offset-4 hover:underline"
						>
							Войти
						</Link>
					</p>
				</form>
			)}
		</div>
	);
}
