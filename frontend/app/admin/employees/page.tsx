import EmployeesPageClient from "@/components/admin/employees/EmployeesPageClient";
import { ApiResponse, Employee } from "@/app/types";
import { serverFetch } from "@/lib/server-fetch";

export default async function EmployeesPage() {
    let initialEmployees: Employee[] = [];

    try {
        const response = await serverFetch<ApiResponse<Employee[]>>("/employees");
        initialEmployees = response.data ?? [];
    } catch {
        initialEmployees = [];
    }

    return <EmployeesPageClient initialEmployees={initialEmployees} />;
}
