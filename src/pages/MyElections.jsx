import { useState } from "react";
import {
    Search,
    FolderOpen,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyElections() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const filters = ["All", "Created", "Participating"];

    const emptyMessages = {
        All: {
            title: "Your elections will appear here",
            description:
                "Elections you create or participate in will be collected here so you can easily manage and track them."
        },
        Created: {
            title: "You haven't created any elections yet",
            description:
                "Start an election for your organization and manage the entire election process from Votexa."
        },
        Participating: {
            title: "No participation activity yet",
            description:
                "When you register as a voter or apply as a candidate in an election, it will appear here."
        }
    };

    return (
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <section className="mb-9">

                <div className="flex items-center gap-2 text-indigo-600 mb-3">
                    <Sparkles size={16} />

                    <span className="text-xs font-bold tracking-[0.18em] uppercase">
                        Your Activity
                    </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                            My Elections
                        </h2>

                        <p className="text-slate-500 mt-3 text-base md:text-lg">
                            Manage elections you've created or participate in.
                        </p>
                    </div>

                </div>

            </section>

            {/* Search and Filters */}
            <section className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm mb-9">

                <div className="relative">

                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your elections..."
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                    />

                </div>

                <div className="flex flex-wrap gap-2 mt-5">

                    {filters.map((filter) => (

                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
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

            {/* Election List */}
            <section>

                <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-900">
                        {activeFilter === "All"
                            ? "All Your Elections"
                            : activeFilter === "Created"
                                ? "Elections Created by You"
                                : "Elections You're Participating In"}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Keep track of your election activities and applications.
                    </p>
                </div>

                {/* Empty State */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                    <div className="relative px-6 py-16 md:py-20 flex flex-col items-center text-center">

                        <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>

                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-50 rounded-full blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 h-20 w-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">

                            <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                <FolderOpen
                                    size={29}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                        <div className="relative z-10 max-w-md">

                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                                {emptyMessages[activeFilter].title}
                            </h3>

                            <p className="text-slate-500 leading-relaxed mt-3">
                                {emptyMessages[activeFilter].description}
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/elections")}
                            className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            Explore All Elections
                            <ArrowRight size={17} />
                        </button>

                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                        <p className="text-xs text-slate-500">
                            Your created elections and participation activity will be displayed here.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default MyElections; 