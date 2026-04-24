"use client";

import { Employee, Review } from "@/app/types";

type AssignReviewSectionProps = {
    reviews: Review[];
    employees: Employee[];
    reviewId: string;
    reviewerId: string;
    revieweeId: string;
    onReviewChange: (value: string) => void;
    onReviewerChange: (value: string) => void;
    onRevieweeChange: (value: string) => void;
    onSave: () => void;
    isSubmitting: boolean;
};

export default function AssignReviewSection({
    reviews,
    employees,
    reviewId,
    reviewerId,
    revieweeId,
    onReviewChange,
    onReviewerChange,
    onRevieweeChange,
    onSave,
    isSubmitting,
}: AssignReviewSectionProps) {
    return (
        <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
                <select
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    value={reviewId}
                    onChange={(e) => onReviewChange(e.target.value)}
                >
                    <option value="">Select review</option>
                    {reviews.map((review) => (
                        <option key={review._id} value={review._id}>
                            {review.title}
                        </option>
                    ))}
                </select>

                <select
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    value={reviewerId}
                    onChange={(e) => onReviewerChange(e.target.value)}
                >
                    <option value="">Select reviewer</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.name}
                        </option>
                    ))}
                </select>

                <select
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    value={revieweeId}
                    onChange={(e) => onRevieweeChange(e.target.value)}
                >
                    <option value="">Select reviewee</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={onSave}
                disabled={isSubmitting}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? "Saving..." : "Save Assignment"}
            </button>
        </div>
    );
}
