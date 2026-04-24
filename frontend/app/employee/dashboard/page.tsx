import DashboardPageClient from "@/components/employee/dashboard/DashboardPageClient";
import { ApiResponse, Assignment } from "@/app/types";
import { serverFetch } from "@/lib/server-fetch";

const MOCK_USER_ID = "69ea3a2f3575a37dcdf26ec8";

type DashboardProps = {
    searchParams: Promise<{ userId?: string | string[] }>;
};


export default async function Dashboard({ searchParams }: DashboardProps) {
    const params = await searchParams;
    const fromQuery = params.userId;
    const userId = fromQuery || MOCK_USER_ID;

    let initialAssignments: Assignment[] = [];

    try {
        const response = await serverFetch<ApiResponse<Assignment[]>>(
            `/reviews/assigned/${userId}`
        );
        initialAssignments = response.data ?? [];
    } catch {
        initialAssignments = [];
    }

    return <DashboardPageClient initialAssignments={initialAssignments} />;
}
