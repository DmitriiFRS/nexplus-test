/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ table: string }> }) {
	try {
		const tableName = (await params).table;
		if (tableName !== "invoices" && tableName !== "orders") {
			return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
		}

		const body = await request.json();
		const { sortModel, filterModel } = body;

		// console.log("sortModel =========== >", sortModel);
		// console.log("filterModel =========== >", filterModel);

		const supabase = await createClient();
		let queryBuilder = supabase.from(tableName).select("*"); // Можно добавить пагинацию

		if (filterModel) {
			Object.entries(filterModel).forEach(([colId, filterData]: [string, any]) => {
				const { filterType, type, filter, filterTo, dateFrom, dateTo } = filterData;

				let value = filter ?? dateFrom;
				let valueTo = filterTo ?? dateTo;

				if (filterType === "date") {
					if (typeof value === "string") value = value.split(" ")[0];
					if (typeof valueTo === "string") valueTo = valueTo.split(" ")[0];
				}

				if (value === undefined || value === null) return;

				if (filterType === "text") {
					if (type === "contains") queryBuilder = queryBuilder.ilike(colId, `%${value}%`);
					if (type === "notContains") queryBuilder = queryBuilder.not(colId, "ilike", `%${value}%`);
					if (type === "equals") queryBuilder = queryBuilder.eq(colId, value);
					if (type === "startsWith") queryBuilder = queryBuilder.ilike(colId, `${value}%`);
					if (type === "endsWith") queryBuilder = queryBuilder.ilike(colId, `%${value}`);
				} else if (filterType === "number" || filterType === "date") {
					if (type === "equals") queryBuilder = queryBuilder.eq(colId, value);
					if (type === "notEqual") queryBuilder = queryBuilder.neq(colId, value);
					if (type === "greaterThan") queryBuilder = queryBuilder.gt(colId, value);
					if (type === "lessThan") queryBuilder = queryBuilder.lt(colId, value);
					if (type === "inRange" && valueTo !== undefined && valueTo !== null) {
						queryBuilder = queryBuilder.gte(colId, value).lte(colId, valueTo);
					}
				}
			});
		}

		if (sortModel && sortModel.length > 0) {
			sortModel.forEach(({ colId, sort }: any) => {
				queryBuilder = queryBuilder.order(colId, { ascending: sort === "asc" });
			});
		} else {
			const defaultSortCol = tableName === "invoices" ? "invoice_date" : "order_date";
			queryBuilder = queryBuilder.order(defaultSortCol, { ascending: false });
		}

		const { data, error } = await queryBuilder;

		// console.log("data =========== >", data);

		if (error) throw error;

		return NextResponse.json({ data });
	} catch (error) {
		console.error("API Route Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
