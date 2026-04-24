import Link from "next/link";
import { ApiResponse, Employee, Review } from "@/app/types";
import { serverFetch } from "@/lib/server-fetch";

export default async function AdminDashboardPage() {
  let employeeCount = 0;
  let reviewCount = 0;

  try {
    const [employeesResponse, reviewsResponse] = await Promise.all([
      serverFetch<ApiResponse<Employee[]>>("/employees"),
      serverFetch<ApiResponse<Review[]>>("/reviews"),
    ]);

    employeeCount = employeesResponse.data?.length ?? 0;
    reviewCount = reviewsResponse.data?.length ?? 0;
  } catch {
    employeeCount = 0;
    reviewCount = 0;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Quick overview of core admin modules.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/employees"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm text-slate-500">Employees</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{employeeCount}</p>
            <p className="mt-2 text-sm text-slate-600">Manage employee records</p>
          </Link>

          <Link
            href="/admin/reviews"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm text-slate-500">Reviews</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{reviewCount}</p>
            <p className="mt-2 text-sm text-slate-600">Manage performance reviews</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
