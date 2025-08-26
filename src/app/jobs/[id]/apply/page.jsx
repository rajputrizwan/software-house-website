"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ApplyPage() {
    const { id } = useParams();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        headline: "",
        phone: "",
        address: "",
        education: "",
        experience: "",
        summary: "",
        resume: null,
        coverLetter: "",
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Application submitted for Job ID: ${id}`);
        console.log("Form Data:", form);
    };

    return (
        <div className="max-w-3xl mx-auto mt-16 py-12 px-6">
            <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                Apply for Job #{id}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-10 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-colors"
            >
                {/* Personal Info */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                First name *
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                                value={form.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Last name *
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                                value={form.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email *
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Headline (Optional)
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                            value={form.headline}
                            onChange={(e) => handleChange("headline", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="City, Country"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                            value={form.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </div>
                </section>

                {/* Profile */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Profile
                    </h2>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Education
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                            value={form.education}
                            onChange={(e) => handleChange("education", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Experience
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                            value={form.experience}
                            onChange={(e) => handleChange("experience", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Summary
                        </label>
                        <textarea
                            rows={3}
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                            value={form.summary}
                            onChange={(e) => handleChange("summary", e.target.value)}
                        />
                    </div>
                </section>

                {/* Resume */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Resume
                    </h2>
                    <input
                        type="file"
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                        onChange={(e) => handleChange("resume", e.target.files[0])}
                    />
                </section>

                {/* Cover Letter */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Cover Letter
                    </h2>
                    <textarea
                        rows={4}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg"
                        value={form.coverLetter}
                        onChange={(e) => handleChange("coverLetter", e.target.value)}
                    />
                </section>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 dark:bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-800 dark:hover:bg-green-700 font-semibold transition"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
}
