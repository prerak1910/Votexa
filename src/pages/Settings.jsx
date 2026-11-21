import {
    Settings as SettingsIcon,
    Bell,
    ShieldCheck,
    Mail,
    Lock,
    Smartphone
} from "lucide-react";

function Settings() {
    return (
        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-9">
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-indigo-600 mb-3">
                    Preferences
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Settings
                </h2>

                <p className="text-slate-500 mt-3 text-base md:text-lg">
                    Manage your Votexa account preferences and security.
                </p>
            </div>

            <div className="space-y-6">

                {/* Account Preferences */}
                <section className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <SettingsIcon className="text-indigo-600" size={22} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Account Preferences
                            </h3>

                            <p className="text-sm text-slate-500">
                                Manage your general account preferences.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <Smartphone size={21} className="text-slate-500" />

                        <div>
                            <p className="font-semibold text-slate-800 text-sm">
                                Platform Experience
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Votexa is currently using its default appearance settings.
                            </p>
                        </div>
                    </div>

                </section>

                {/* Notifications */}
                <section className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <Bell className="text-indigo-600" size={22} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Notifications
                            </h3>

                            <p className="text-sm text-slate-500">
                                Manage how you receive election updates.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                            <Bell size={21} className="text-slate-500" />

                            <div>
                                <p className="font-semibold text-slate-800 text-sm">
                                    In-app Notifications
                                </p>

                                <p className="text-sm text-slate-500 mt-1">
                                    Updates about your election activities and applications.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                            <Mail size={21} className="text-slate-500" />

                            <div>
                                <p className="font-semibold text-slate-800 text-sm">
                                    Email Notifications
                                </p>

                                <p className="text-sm text-slate-500 mt-1">
                                    Important election updates delivered to your email.
                                </p>
                            </div>
                        </div>

                    </div>

                </section>

                {/* Security */}
                <section className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <ShieldCheck className="text-indigo-600" size={22} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Security
                            </h3>

                            <p className="text-sm text-slate-500">
                                Information about your account security.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <Lock size={21} className="text-slate-500" />

                        <div>
                            <p className="font-semibold text-slate-800 text-sm">
                                Account Authentication
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Your account is protected using password-based authentication.
                            </p>
                        </div>
                    </div>

                </section>

            </div>

        </div>
    );
}

export default Settings;