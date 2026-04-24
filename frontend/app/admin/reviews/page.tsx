import { ApiResponse, Assignment, Employee, Review } from "@/app/types";
import ReviewsPageClient from "@/components/admin/reviews/ReviewsPageClient";
import { getApiData, serverFetch } from "@/lib/server-fetch";

export default async function ReviewsPage() {
    let initialReviews: Review[] = [];
    let initialEmployees: Employee[] = [];
    let initialAssignments: Assignment[] = [];
    try {
        const [reviewsResponse, employeesResponse, assignmentsResponse] = await Promise.all([
            serverFetch<ApiResponse<Review[]>>("/reviews"),
            serverFetch<ApiResponse<Employee[]>>("/employees"),
            serverFetch<ApiResponse<Assignment[]>>("/reviews/assignments"),
        ]);
        initialReviews = getApiData<Review[]>(reviewsResponse?.data ?? []) || [];
        initialEmployees = getApiData<Employee[]>(employeesResponse?.data ?? []) || [];
        initialAssignments = getApiData<Assignment[]>(assignmentsResponse?.data ?? []) || [];
    } catch {
        initialReviews = [];
        initialEmployees = [];
        initialAssignments = [];
    }

    return (
        <ReviewsPageClient
            initialReviews={initialReviews}
            initialEmployees={initialEmployees}
            initialAssignments={initialAssignments}
        />
    );
}