import { useEffect, useMemo, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    Vote,
    ArrowRight,
    Sparkles,
    CalendarDays,
    Compass,
    Building2,
    Clock3,
    AlertCircle,
    RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AllElections() {

    const [elections, setElections] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const filters = ["All", "Upcoming", "Live", "Completed"];

    // Fetch elections from Flask backend
    async function fetchElections() {

        setLoading(true);
        setError("");

        const token = sessionStorage.getItem("access_token");

        if (!token) {
            setError("Your session has expired. Please log in again.");
            setLoading(false);
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/api/elections",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to fetch elections."
                );
            }

            setElections(data.elections || []);

        } catch (err) {

            console.error("Election fetching error:", err);
            setError(err.message || "Something went wrong.");

        } finally {

            setLoading(false);

        }
    }

    // Fetch elections when page loads
    useEffect(() => {
        fetchElections();
    }, []);

    // Search and filter elections
    const filteredElections = useMemo(() => {

        return elections.filter((election) => {

            const matchesFilter =
                activeFilter === "All" ||
                election.status === activeFilter;

            const query = searchQuery.toLowerCase().trim();

            const matchesSearch =
                election.title.toLowerCase().includes(query) ||
                election.organization_name.toLowerCase().includes(query);

            return matchesFilter && matchesSearch;

        });

    }, [elections, activeFilter, searchQuery]);

    // Format date
    function formatDate(dateString) {

        return new Date(dateString).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

    }

    // Status badge styling
    function getStatusStyle(status) {

        switch (status) {

            case "Live":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";

            case "Upcoming":
                return "bg-indigo-50 text-indigo-700 border-indigo-200";

            case "Completed":
                return "bg-slate-100 text-slate-600 border-slate-200";

            default:
                return "bg-gray-100 text-gray-600";
        }
    }

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
                        onClick={() => {
                            setSearchQuery("");
                            setActiveFilter("All");
                        }}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    >

                        <SlidersHorizontal size={18} />

                        <span className="text-sm font-medium">
                            Reset Filters
                        </span>

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

                            {loading
                                ? "Fetching available elections..."
                                : `${filteredElections.length} elections found`
                            }

                        </p>

                    </div>

                    <button
                        onClick={fetchElections}
                        disabled={loading}
                        className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                    >

                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />

                        Refresh

                    </button>

                </div>


                {/* Loading State */}
                {loading && (

                    <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">

                        <RefreshCw
                            size={30}
                            className="animate-spin text-indigo-600 mx-auto mb-4"
                        />

                        <p className="text-slate-600 font-medium">
                            Loading elections...
                        </p>

                    </div>

                )}


                {/* Error State */}
                {!loading && error && (

                    <div className="bg-white border border-red-200 rounded-2xl p-12 text-center">

                        <AlertCircle
                            size={35}
                            className="text-red-500 mx-auto mb-4"
                        />

                        <h3 className="text-lg font-bold text-slate-900">
                            Unable to load elections
                        </h3>

                        <p className="text-slate-500 mt-2">
                            {error}
                        </p>

                        <button
                            onClick={fetchElections}
                            className="mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* Election Cards */}
                {!loading && !error && filteredElections.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {filteredElections.map((election) => (

                            <div
                                key={election.id}
                                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center">

                                        <Vote
                                            size={23}
                                            className="text-indigo-600"
                                        />

                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(election.status)}`}
                                    >
                                        {election.status}
                                    </span>

                                </div>


                                <h3 className="text-lg font-bold text-slate-900 mt-5">
                                    {election.title}
                                </h3>


                                <div className="flex items-center gap-2 mt-2 text-sm text-indigo-600">

                                    <Building2 size={16} />

                                    <span>
                                        {election.organization_name}
                                    </span>

                                </div>


                                <p className="text-sm text-slate-500 leading-relaxed mt-4 line-clamp-3">
                                    {election.description}
                                </p>


                                <div className="border-t border-slate-100 mt-5 pt-5 space-y-3">

                                    <div className="flex items-center gap-2 text-sm text-slate-500">

                                        <CalendarDays size={16} className="text-indigo-500" />

                                        <span>
                                            Starts: {formatDate(election.voting_starts_at)}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-500">

                                        <Clock3 size={16} className="text-indigo-500" />

                                        <span>
                                            Ends: {formatDate(election.voting_ends_at)}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Empty State */}
                {!loading && !error && filteredElections.length === 0 && (

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                        <div className="relative px-6 py-16 md:py-20 flex flex-col items-center text-center">

                            <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>

                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-50 rounded-full blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>


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

                                    {searchQuery || activeFilter !== "All"
                                        ? "No matching elections found"
                                        : "No elections to explore yet"
                                    }

                                </h3>

                                <p className="text-slate-500 leading-relaxed mt-3">

                                    {searchQuery || activeFilter !== "All"
                                        ? "Try changing your search or selecting a different filter."
                                        : "There are currently no published elections available. Once organizations' elections are reviewed and approved, they will appear here."
                                    }

                                </p>

                            </div>


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
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveFilter("All");
                                    navigate("/my-elections");
                                }}
                                className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >

                                View My Elections

                                <ArrowRight size={17} />

                            </button>

                        </div>


                        <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                            <p className="text-xs text-slate-500">
                                Only platform-approved elections are displayed.
                            </p>

                            <span className="text-xs font-semibold text-slate-400">
                                VOTEXA · ELECTION DISCOVERY
                            </span>

                        </div>

                    </div>

                )}

            </section>

        </div>

    );

}

export default AllElections;