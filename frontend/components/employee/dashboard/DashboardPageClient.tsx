"use client";

import { Assignment } from "@/app/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type DashboardPageClientProps = {
    initialAssignments: Assignment[];
};

const reviewTitle = (a: Assignment) => a.review?.title ?? a.reviewId?.title ?? "Untitled Review";
const revieweeName = (a: Assignment) => a.reviewee?.name ?? a.revieweeId?.name ?? "Unknown employee";

export default function DashboardPageClient({ initialAssignments }: DashboardPageClientProps) {
    return (
        <div className="min-h-screen bg-slate-50/70 p-6 md:p-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-5 text-2xl font-semibold tracking-tight text-slate-900">My Reviews</h1>

                {initialAssignments.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>No pending reviews</CardTitle>
                            <CardDescription>New assignments will show up here.</CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {initialAssignments.map((a) => (
                            <Card key={a._id} className="transition hover:shadow-md">
                                <CardHeader>
                                    <CardTitle>{reviewTitle(a)}</CardTitle>
                                    <CardDescription>Review assignment</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-700">
                                        Reviewing:{" "}
                                        <span className="font-medium text-slate-900">{revieweeName(a)}</span>
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Link
                                        href={`/employee/feedback/${a._id}`}
                                        className="inline-flex rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                                    >
                                        Give Feedback
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
