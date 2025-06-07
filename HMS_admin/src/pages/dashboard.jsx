import { useState } from "react";
import { Calendar, Download } from "lucide-react";
import RecentReservations from "../components/dashboard/recent-reservation";
import RoomStatus from "../components/dashboard/room-status";
import StatsOverview from "../components/dashboard/stats-overview";

export default function Dashboard() {
    const [dateRange, setDateRange] = useState("Last 30 days");

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Overview of your hotel's performance and activity
                    </p>
                </div>

            </div>

            {/* Stats Overview */}
            <StatsOverview />

            {/* Reservations and Room Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <RecentReservations />
                <RoomStatus />
            </div>
        </div>
    );
}
