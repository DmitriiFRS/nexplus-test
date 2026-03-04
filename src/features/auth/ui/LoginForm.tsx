"use client";

import { useActionState } from "react";
import { signIn } from "../../../actions/auth";
import { SubmitButton } from "./SubmitButton";
import { AuthInput } from "./AuthInput";
import { FormError } from "./FormError";
import Link from "next/link";

const initialState = {
	error: "",
};

export function LoginForm() {
	const [state, formAction, isPending] = useActionState(signIn, initialState);

	return (
		<div className="w-full max-w-md mx-auto p-8 rounded-4xl bg-neutral-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.8)] transition-all duration-500 relative overflow-hidden">
			<div className="absolute top-0 inset-x-0 h-40 bg-linear-to-b from-blue-500/20 to-transparent blur-3xl -z-10 rounded-t-4xl"></div>

			<div className="mb-8 text-center mt-2">
				<h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Войти</h2>
			</div>
			<form action={formAction} className="space-y-5">
				<div className="space-y-4">
					<AuthInput id="email" name="email" type="email" required label="Email" placeholder="name@example.com" />
					<AuthInput id="password" name="password" type="password" required label="Пароль" placeholder="••••••••" />
				</div>
				<FormError message={state?.error} />
				<div className="pt-2">
					<SubmitButton loading={isPending}>Войти</SubmitButton>
				</div>
				<p className="text-center text-sm text-neutral-400 pt-4">
					Ещё нет аккаунта?{" "}
					<Link
						href="/register"
						className="text-white hover:text-neutral-200 font-semibold transition-colors underline-offset-4 hover:underline"
					>
						Зарегистрироваться
					</Link>
				</p>
			</form>
		</div>
	);
}
