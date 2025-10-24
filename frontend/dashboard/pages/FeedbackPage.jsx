import { useParams, Link } from "react-router-dom";
import FeedbackCard from "../components/feedbackcard.jsx";

export default function FeedbackPage() {
    const { eventId } = useParams();

    if (!eventId) {
        return <div className="p-6">Missing event id</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
            <div className="max-w-xl mx-auto p-6">
                {/* Back button to go back to event details */}
                <Link to={`/events/${eventId}`} className="text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 underline mb-4 block transition-colors duration-200">
                    ← Back to Event
                </Link>

                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Event Feedback</h1>
                <FeedbackCard eventId={eventId} />
            </div>
        </div>
    );
}
