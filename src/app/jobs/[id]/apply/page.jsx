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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare payload and convert resume File to base64 if present
        try {
            const payload = {
                type: 'job-application',
                jobId: id,
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                headline: form.headline,
                phone: form.phone,
                address: form.address,
                education: form.education,
                experience: form.experience,
                summary: form.summary,
                coverLetter: form.coverLetter,
            };

            // If a resume File object is present, convert to base64 and include metadata
            if (form.resume) {
                const file = form.resume;
                // read as base64
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (err) => reject(err);
                    reader.readAsDataURL(file);
                });

                // base64 will be like: data:application/pdf;base64,AAAA..., so split
                const match = /^data:(.*);base64,(.*)$/.exec(base64);
                if (match) {
                    const contentType = match[1];
                    const content = match[2];
                    payload.resume = {
                        filename: file.name,
                        content,
                        contentType,
                    };
                } else {
                    console.warn('Could not parse base64 file data for resume');
                }
            }

            const res = await fetch('/api/send-mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject: `New application for job ${id}`, ...payload }),
            });

            if (res.ok) {
                alert(`Application submitted for Job ID: ${id}`);
            } else {
                const text = await res.text();
                console.error('Email API error:', text);
                alert('There was a problem submitting your application. Please try again later.');
            }
        } catch (err) {
            console.error('Submit error:', err);
            alert('There was a problem submitting your application.');
        }

        console.log('Form Data sent (sans binary):', {
            ...form,
            resume: form.resume ? form.resume.name : null,
        });
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
