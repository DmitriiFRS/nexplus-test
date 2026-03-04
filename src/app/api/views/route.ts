import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const tableName = searchParams.get("tableName");

	const supabase = await createClient();
	const { data, error } = await supabase.from("views").select("*").eq("table_name", tableName);

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from("views")
		.insert({
			user_id: user?.id,
			table_name: body.tableName,
			view_name: body.viewName,
			grid_state: body.gridState,
			is_default: body.isDefault || false,
		})
		.select()
		.single();

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
	const body = await request.json();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("views")
		.update({
			grid_state: body.gridState,
		})
		.eq("id", body.id)
		.select()
		.single();

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ data });
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	const supabase = await createClient();
	const { error } = await supabase.from("views").delete().eq("id", id);

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}
