import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function proxy(request: NextRequest) {
	const response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register");

	if (!user && !isAuthRoute) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (user && isAuthRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
