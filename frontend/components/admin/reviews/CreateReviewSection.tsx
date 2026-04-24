"use client";

type CreateReviewSectionProps = {
    title: string;
    description: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSave: () => void;
    isSubmitting: boolean;
};

export default function CreateReviewSection({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSave,
    isSubmitting,
}: CreateReviewSectionProps) {
    return (
        <div className="space-y-4">
            <input
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                placeholder='Title (e.g., "Q1 2026 Review")'
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
            />
            <textarea
                className="min-h-28 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                placeholder="Description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
            />
            <button
                onClick={onSave}
                disabled={isSubmitting}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? "Saving..." : "Save Review"}
            </button>
        </div>
    );
}
