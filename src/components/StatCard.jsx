function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

            <div className="flex items-center justify-between">

                {/* Card information */}
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-2">
                        {value}
                    </h2>
                </div>

                {/* Icon */}
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon size={24} />
                </div>

            </div>
        </div>
    );
}

export default StatCard;