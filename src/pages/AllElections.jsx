import { useState } from "react";
import {
    Search,
    SlidersHorizontal,
    Vote,
    ArrowRight,
    Sparkles,
    CalendarDays,
    Compass
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AllElections() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const filters = ["All", "Upcoming", "Live", "Completed"];

    return (
        <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <section className="mb-9">

                <div className="flex items-center gap-2 text-indigo-600 mb-3">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold tracking-[0.18em] uppercase">
                        Discover
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                            Find your next election.
                        </h2>

                        <p className="text-slate-500 mt-3 text-base md:text-lg">
                            Explore verified elections from organizations on Votexa.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        Verified elections only
                    </div>

                </div>

            </section>

            {/* Search and Filters */}
            <section className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm mb-9">

                <div className="flex flex-col lg:flex-row gap-4">

                    {/* Search */}
                    <div className="relative flex-1">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by election or organization name..."
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                        />

                    </div>

                    {/* Filter Button */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <SlidersHorizontal size={18} />
                        <span className="text-sm font-medium">Filters</span>
                    </button>

                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 mt-5">

                    {filters.map((filter) => (

                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeFilter === filter
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                                    : "text-slate-500 hover:bg-slate-100"
                            }`}
                        >
                            {filter}
                        </button>

                    ))}

                </div>

            </section>

            {/* Elections Section */}
            <section>

                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            Available Elections
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Elections approved and published by the platform.
                        </p>
                    </div>

                </div>

                {/* Empty State */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                    <div className="relative px-6 py-16 md:py-20 flex flex-col items-center text-center">

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>

                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-50 rounded-full blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

                        {/* Illustration */}
                        <div className="relative z-10 h-20 w-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">

                            <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                <Vote
                                    size={30}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                        <div className="relative z-10 max-w-md">

                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                                No elections to explore yet
                            </h3>

                            <p className="text-slate-500 leading-relaxed mt-3">
                                There are currently no published elections available.
                                Once organizations' elections are reviewed and approved,
                                they will appear here.
                            </p>

                        </div>

                        {/* Supporting Information */}
                        <div className="relative z-10 flex flex-wrap justify-center gap-5 mt-8">

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Compass size={17} className="text-indigo-500" />
                                Discover elections
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <CalendarDays size={17} className="text-indigo-500" />
                                Track election dates
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/my-elections")}
                            className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            View My Elections
                            <ArrowRight size={17} />
                        </button>

                    </div>

                    {/* Bottom Strip */}
                    <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                        <p className="text-xs text-slate-500">
                            Only platform-approved elections are displayed.
                        </p>

                        <span className="text-xs font-semibold text-slate-400">
                            VOTEXA · ELECTION DISCOVERY
                        </span>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default AllElections;