"use client";

import React, { ReactNode } from "react";
import { AgGridProvider } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
interface AgGridProviderWrapperProps {
	children: ReactNode;
}

export function AgGridProviderWrapper({ children }: AgGridProviderWrapperProps) {
	return <AgGridProvider modules={[AllCommunityModule]}>{children}</AgGridProvider>;
}
