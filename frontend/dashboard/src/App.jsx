import { Routes, Route } from "react-router-dom";
import EventsScreen from "../pages/EventsScreen.jsx";
import SingleEventDetailPage from "../pages/SingleEventDetailPage.jsx";
import FeedbackPage from "../pages/FeedbackPage.jsx";
import RecommendedEvents from "../pages/RecommendedEvents.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Routes>
        <Route path="/" element={<EventsScreen />} />
        <Route path="/events/:id" element={<SingleEventDetailPage />} />
        <Route path="/events/:eventId/feedback" element={<FeedbackPage />} />
        <Route path="/recommended" element={<RecommendedEvents />} />
      </Routes>
    </div>
  );
}


