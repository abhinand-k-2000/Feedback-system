"use client";

import { api } from "@/app/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FeedbackPageClientProps = {
    assignmentId: string;
};

export default function FeedbackPageClient({ assignmentId }: FeedbackPageClientProps) {
    const router = useRouter();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            setError("Please add feedback comments before submitting.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            await api.post("/feedback", {
                assignmentId,
                comment: comment.trim(),
                rating,
            });

            router.push("/employee/dashboard");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/70 p-6 md:p-8">
            <div className="mx-auto max-w-3xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Submit Feedback</CardTitle>
                        <CardDescription>
                            Share clear, constructive feedback for this assignment.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {error ? (
                            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                                {error}
                            </div>
                        ) : null}

                        <div>
                            <p className="mb-2 text-sm font-medium text-slate-900">Rating</p>
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setRating(value)}
                                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${rating === value
                                            ? "bg-slate-900 text-white"
                                            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-sm font-medium text-slate-900">Comments</p>
                            <textarea
                                className="min-h-36 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                placeholder="Write feedback..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Feedback"}
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
