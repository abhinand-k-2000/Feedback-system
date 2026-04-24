import FeedbackPageClient from "@/components/employee/feedback/FeedbackPageClient";

type FeedbackPageProps = {
    params: Promise<{ assignmentId: string }>;
};

export default async function FeedbackPage({ params }: FeedbackPageProps) {
    const { assignmentId } = await params;
    return <FeedbackPageClient assignmentId={assignmentId} />;
}