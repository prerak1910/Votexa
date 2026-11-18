import { CalendarDays, Users, ArrowRight } from "lucide-react";

const elections = [
    {
        id: 1,
        title: "Student Council Election 2026",
        organization: "LNMIIT Student Council",
        status: "Active",
        voters: 450,
        votes: 320,
    },
    {
        id: 2,
        title: "ACM Committee Election",
        organization: "ACM Student Chapter",
        status: "Upcoming",
        voters: 120,
        votes: 0,
    },
    {
        id: 3,
        title: "Cultural Committee Election",
        organization: "Cultural Council",
        status: "Completed",
        voters: 300,
        votes: 285,
    },
];

function RecentElections() {
    return (
        <section className="mt-10">

            {/* Section heading */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                    Recent Elections
                </h2>

                <button className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800">
                    View All
                    <ArrowRight size={18} />
                </button>
            </div>

            {/* Elections list */}
            <div className="space-y-4">

                {elections.map((election) => (
                    <div
                        key={election.id}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >

                        {/* Election details */}
                        <div className="flex items-start justify-between">

                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    {election.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    {election.organization}
                                </p>
                            </div>

                            {/* Status */}
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${
                                        election.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : election.status === "Upcoming"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {election.status}
                            </span>

                        </div>

                        {/* Election statistics */}
                        <div className="flex items-center gap-6 mt-5 text-sm text-gray-500">

                            <div className="flex items-center gap-2">
                                <Users size={18} />

                                <span>
                                    {election.voters} Eligible Voters
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays size={18} />

                                <span>
                                    {election.votes} Votes Cast
                                </span>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </section>
    );
}

export default RecentElections;