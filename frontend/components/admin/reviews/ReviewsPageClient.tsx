"use client";

import { api } from "@/app/lib/api";
import { Assignment, Employee, Review } from "@/app/types";
import { useMemo, useState } from "react";
import AssignReviewSection from "./AssignReviewSection";
import CreateReviewSection from "./CreateReviewSection";
import Modal from "@/components/common/Modal";
import CommonTable from "@/components/common/CommonTable";
import { entityFromResponse } from "@/lib/api-response";

type ReviewsPageClientProps = {
    initialReviews: Review[];
    initialEmployees: Employee[];
    initialAssignments: Assignment[];
};

export default function ReviewsPageClient({
    initialReviews,
    initialEmployees,
    initialAssignments,
}: ReviewsPageClientProps) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [reviewId, setReviewId] = useState("");
    const [reviewerId, setReviewerId] = useState("");
    const [revieweeId, setRevieweeId] = useState("");
    const [editingReviewId, setEditingReviewId] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showAssignForm, setShowAssignForm] = useState(false);
    const [showEditReviewForm, setShowEditReviewForm] = useState(false);
    const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
    const [isSubmittingAssignment, setIsSubmittingAssignment] = useState(false);
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
    const [error, setError] = useState("");

    const employeeOptions = useMemo(
        () => initialEmployees.filter((employee) => employee?.role === "employee"),
        [initialEmployees]
    );

    const handleCreateReview = async () => {
        if (!title.trim() || !description.trim()) {
            setError("Title and description are required to create a review.");
            return;
        }

        setError("");
        setIsSubmittingCreate(true);

        try {
            const response = await api.post("/reviews", {
                title: title.trim(),
                description: description.trim(),
            });
            const newReview = entityFromResponse<Review>(response);
            if (newReview) {
                setReviews((prev) => [...prev, newReview]);
            }

            setTitle("");
            setDescription("");
            setShowCreateForm(false);
        } catch {
            setError("Failed to create review. Please verify your backend and try again.");
        } finally {
            setIsSubmittingCreate(false);
        }
    };

    const handleAssignReview = async () => {
        if (!reviewId || !reviewerId || !revieweeId) {
            setError("Select review, reviewer, and reviewee before assigning.");
            return;
        }

        if (reviewerId === revieweeId) {
            setError("Reviewer and reviewee must be different employees.");
            return;
        }

        setError("");
        setIsSubmittingAssignment(true);

        try {
            const response = await api.post("/reviews/assignments", {
                reviewId,
                reviewerId,
                revieweeId,
                status: "pending",
            });
            const newAssignment = entityFromResponse<Assignment>(response);
            if (newAssignment) {
                setAssignments((prev) => [...prev, newAssignment]);
            }

            setReviewId("");
            setReviewerId("");
            setRevieweeId("");
            setShowAssignForm(false);
        } catch {
            setError("Failed to assign review. Please verify your backend and try again.");
        } finally {
            setIsSubmittingAssignment(false);
        }
    };

    const openEditReviewModal = (review: Review) => {
        setEditingReviewId(review._id);
        setTitle(review.title);
        setDescription(review.description);
        setShowEditReviewForm(true);
    };

    const handleEditReview = async () => {
        if (!editingReviewId) {
            return;
        }

        if (!title.trim() || !description.trim()) {
            setError("Title and description are required to update a review.");
            return;
        }

        setError("");
        setIsSubmittingEdit(true);

        try {
            const response = await api.put(`/reviews/${editingReviewId}`, {
                title: title.trim(),
                description: description.trim(),
            });
            const updated = entityFromResponse<Review>(response);
            if (updated) {
                setReviews((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
            }

            setEditingReviewId("");
            setTitle("");
            setDescription("");
            setShowEditReviewForm(false);
        } catch {
            setError("Failed to update review. Please verify your backend and try again.");
        } finally {
            setIsSubmittingEdit(false);
        }
    };

    const getAssignmentReview = (assignment: Assignment) => assignment.review ?? assignment.reviewId;
    const getAssignmentReviewer = (assignment: Assignment) => assignment.reviewer ?? assignment.reviewerId;
    const getAssignmentReviewee = (assignment: Assignment) => assignment.reviewee ?? assignment.revieweeId;

    const openAssignmentDetails = (assignment: Assignment) => {
        setSelectedAssignment(assignment);
        setShowAssignmentDetails(true);
    };

    return (
        <div className="min-h-screen bg-slate-50/70 p-4 md:p-8">
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                Performance Reviews
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Create review cycles and assign reviewer-reviewee pairs.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Create Review
                            </button>
                            <button
                                onClick={() => setShowAssignForm(true)}
                                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                Assign Review
                            </button>
                        </div>
                    </div>
                </div>

                {error ? (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </div>
                ) : null}

                <Modal
                    isOpen={showCreateForm}
                    title="Create Performance Review"
                    onClose={() => setShowCreateForm(false)}
                >
                    <CreateReviewSection
                        title={title}
                        description={description}
                        onTitleChange={setTitle}
                        onDescriptionChange={setDescription}
                        onSave={handleCreateReview}
                        isSubmitting={isSubmittingCreate}
                    />
                </Modal>

                <Modal
                    isOpen={showAssignForm}
                    title="Assign Review"
                    onClose={() => setShowAssignForm(false)}
                >
                    <AssignReviewSection
                        reviews={reviews}
                        employees={employeeOptions}
                        reviewId={reviewId}
                        reviewerId={reviewerId}
                        revieweeId={revieweeId}
                        onReviewChange={setReviewId}
                        onReviewerChange={setReviewerId}
                        onRevieweeChange={setRevieweeId}
                        onSave={handleAssignReview}
                        isSubmitting={isSubmittingAssignment}
                    />
                </Modal>

                <Modal
                    isOpen={showEditReviewForm}
                    title="Edit Review"
                    onClose={() => setShowEditReviewForm(false)}
                >
                    <div className="space-y-4">
                        <input
                            type="text"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                            placeholder='Title (e.g., "Q1 2026 Review")'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="min-h-28 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            onClick={handleEditReview}
                            disabled={isSubmittingEdit}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmittingEdit ? "Saving..." : "Update Review"}
                        </button>
                    </div>
                </Modal>

                <Modal
                    isOpen={showAssignmentDetails}
                    title="Assignment Details"
                    onClose={() => setShowAssignmentDetails(false)}
                >
                    <div className="space-y-3 text-sm text-slate-700">
                        <p>
                            <span className="font-medium text-slate-900">Review:</span>{" "}
                            {selectedAssignment ? (getAssignmentReview(selectedAssignment)?.title ?? "Untitled Review") : "-"}
                        </p>
                        <p>
                            <span className="font-medium text-slate-900">Reviewer:</span>{" "}
                            {selectedAssignment ? (getAssignmentReviewer(selectedAssignment)?.name ?? "Unknown reviewer") : "-"}
                        </p>
                        <p>
                            <span className="font-medium text-slate-900">Reviewee:</span>{" "}
                            {selectedAssignment ? (getAssignmentReviewee(selectedAssignment)?.name ?? "Unknown reviewee") : "-"}
                        </p>
                        <p>
                            <span className="font-medium text-slate-900">Status:</span>{" "}
                            {selectedAssignment?.status ?? "-"}
                        </p>
                        <p>
                            <span className="font-medium text-slate-900">Feedback Rating:</span>{" "}
                            {selectedAssignment?.feedback?.rating ?? "-"}
                        </p>
                        <div>
                            <p className="font-medium text-slate-900">Feedback Comment:</p>
                            <p className="mt-1 rounded-lg border border-slate-200 bg-slate-50 p-3">
                                {selectedAssignment?.feedback?.comment ?? "No feedback comment available."}
                            </p>
                        </div>
                    </div>
                </Modal>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                    <h2 className="mb-3 text-base font-semibold text-slate-900">Existing Reviews</h2>
                    <CommonTable
                        data={reviews}
                        emptyText="No reviews created yet."
                        getRowKey={(review) => review._id}
                        columns={[
                            {
                                key: "title",
                                header: "Title",
                                cell: (review) => (
                                    <span className="font-medium text-slate-900">{review.title}</span>
                                ),
                            },
                            {
                                key: "description",
                                header: "Description",
                                cell: (review) => (
                                    <span className="text-sm text-slate-600">{review.description}</span>
                                ),
                            },
                            {
                                key: "actions",
                                header: "Actions",
                                cell: (review) => (
                                    <button
                                        onClick={() => openEditReviewModal(review)}
                                        className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                    >
                                        Edit
                                    </button>
                                ),
                            },
                        ]}
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                    <h2 className="mb-3 text-base font-semibold text-slate-900">Assignments</h2>
                    <CommonTable
                        data={assignments}
                        emptyText="No assignments yet."
                        getRowKey={(assignment) => assignment._id}
                        columns={[
                            {
                                key: "review",
                                header: "Review",
                                cell: (assignment) => (
                                    <span className="font-medium text-slate-900">
                                        {getAssignmentReview(assignment)?.title ?? "Untitled Review"}
                                    </span>
                                ),
                            },
                            {
                                key: "mapping",
                                header: "Reviewer -> Reviewee",
                                cell: (assignment) => (
                                    <span className="text-sm text-slate-600">
                                        {getAssignmentReviewer(assignment)?.name || "Unknown reviewer"} {" -> "}
                                        {getAssignmentReviewee(assignment)?.name || "Unknown reviewee"}
                                    </span>
                                ),
                            },
                            {
                                key: "rating",
                                header: "Rating",
                                cell: (assignment) => (
                                    <span className="text-sm text-slate-700">
                                        {assignment.feedback?.rating ?? "-"}
                                    </span>
                                ),
                            },
                            {
                                key: "status",
                                header: "Status",
                                cell: (assignment) => (
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${assignment.status === "completed"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-amber-100 text-amber-700"
                                            }`}
                                    >
                                        {assignment.status === "completed" ? "Completed" : "Pending"}
                                    </span>
                                ),
                            },
                            {
                                key: "actions",
                                header: "Actions",
                                cell: (assignment) => (
                                    assignment.status === "completed" ? (
                                        <button
                                            onClick={() => openAssignmentDetails(assignment)}
                                            className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                        >
                                            View
                                        </button>
                                    ) : (
                                        <span className="text-xs text-slate-400">-</span>
                                    )
                                ),
                            },
                        ]}
                    />
                </section>
            </div>
        </div>
    );
}
