"use client";
import { useState } from "react";
import Link from "next/link";

const jobs = [
    { id: 1, title: "Senior Software Engineer - Python/AIML", location: "Lahore, Punjab, Pakistan", type: "On-site", work: "Full time", department: "Engineering", posted: "Today" },
    { id: 2, title: "Associate DevOps Engineer", location: "Lahore, Punjab, Pakistan", type: "On-site", work: "Full time", department: "DevOps", posted: "12 days ago" },
    { id: 3, title: "Software Engineer - Data", location: "Remote", type: "Remote", work: "Full time", department: "Data", posted: "1 week ago" },
    { id: 4, title: "Frontend Engineer - React/Next.js", location: "Islamabad, Pakistan", type: "Hybrid", work: "Full time", department: "Frontend", posted: "2 weeks ago" },
    { id: 5, title: "Backend Engineer - Node.js", location: "Remote", type: "Remote", work: "Full time", department: "Backend", posted: "5 days ago" },
    { id: 6, title: "Cloud Engineer - AWS", location: "Karachi, Pakistan", type: "On-site", work: "Full time", department: "Cloud", posted: "3 weeks ago" },
    { id: 7, title: "AI Researcher", location: "Remote", type: "Remote", work: "Part time", department: "AI", posted: "1 month ago" },
    { id: 8, title: "Mobile Developer - Flutter", location: "Lahore, Pakistan", type: "On-site", work: "Full time", department: "Mobile", posted: "2 days ago" },
    { id: 9, title: "UI/UX Designer", location: "Karachi, Pakistan", type: "Hybrid", work: "Full time", department: "Design", posted: "1 week ago" },
    { id: 10, title: "QA Engineer", location: "Islamabad, Pakistan", type: "On-site", work: "Full time", department: "QA", posted: "4 days ago" },
    { id: 11, title: "Site Reliability Engineer (SRE)", location: "Remote", type: "Remote", work: "Full time", department: "DevOps", posted: "3 weeks ago" },
    { id: 12, title: "Cybersecurity Engineer", location: "Lahore, Pakistan", type: "On-site", work: "Full time", department: "Security", posted: "2 weeks ago" },
    { id: 13, title: "Full Stack Engineer", location: "Remote", type: "Remote", work: "Full time", department: "Engineering", posted: "5 days ago" },
    { id: 14, title: "Blockchain Developer", location: "Islamabad, Pakistan", type: "Hybrid", work: "Full time", department: "Blockchain", posted: "1 week ago" },
    { id: 15, title: "Data Scientist", location: "Remote", type: "Remote", work: "Full time", department: "Data", posted: "3 days ago" },
    { id: 16, title: "Data Engineer", location: "Karachi, Pakistan", type: "On-site", work: "Full time", department: "Data", posted: "4 days ago" },
    { id: 17, title: "Machine Learning Engineer", location: "Remote", type: "Remote", work: "Full time", department: "AI", posted: "Today" },
    { id: 18, title: "Product Manager - Tech", location: "Islamabad, Pakistan", type: "On-site", work: "Full time", department: "Product", posted: "1 week ago" },
    { id: 19, title: "Scrum Master", location: "Lahore, Pakistan", type: "On-site", work: "Full time", department: "Agile", posted: "5 days ago" },
    { id: 20, title: "Technical Writer", location: "Remote", type: "Remote", work: "Part time", department: "Docs", posted: "2 weeks ago" },
    { id: 21, title: "IT Support Engineer", location: "Karachi, Pakistan", type: "On-site", work: "Full time", department: "IT", posted: "6 days ago" },
    { id: 22, title: "Business Analyst", location: "Islamabad, Pakistan", type: "Hybrid", work: "Full time", department: "Business", posted: "1 week ago" },
    { id: 23, title: "DevOps Architect", location: "Remote", type: "Remote", work: "Full time", department: "DevOps", posted: "3 weeks ago" },
    { id: 24, title: "Frontend Lead - React/Next.js", location: "Remote", type: "Remote", work: "Full time", department: "Frontend", posted: "5 days ago" },
    { id: 25, title: "Backend Lead - Node.js/Go", location: "Lahore, Pakistan", type: "On-site", work: "Full time", department: "Backend", posted: "2 days ago" },
    { id: 26, title: "Cloud Solutions Architect", location: "Karachi, Pakistan", type: "On-site", work: "Full time", department: "Cloud", posted: "1 week ago" },
    { id: 27, title: "AI Product Manager", location: "Remote", type: "Remote", work: "Full time", department: "AI", posted: "3 days ago" },
    { id: 28, title: "Graphic Designer", location: "Islamabad, Pakistan", type: "Hybrid", work: "Full time", department: "Design", posted: "2 weeks ago" },
    { id: 29, title: "Senior QA Automation Engineer", location: "Lahore, Pakistan", type: "On-site", work: "Full time", department: "QA", posted: "Today" },
    { id: 30, title: "AR/VR Developer", location: "Remote", type: "Remote", work: "Full time", department: "Innovation", posted: "1 week ago" },
];

export default function JobsPage() {
    const [filters, setFilters] = useState({
        location: "",
        department: "",
        type: "",
        work: "",
        search: "",
    });

    const filteredJobs = jobs.filter(
        (job) =>
            (!filters.search || job.title.toLowerCase().includes(filters.search)) &&
            (!filters.location || job.location.includes(filters.location)) &&
            (!filters.department || job.department === filters.department) &&
            (!filters.type || job.type === filters.type) &&
            (!filters.work || job.work === filters.work)
    );

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 mt-10">
            {/* Company Intro */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900">Careers at escStack</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    At <span className="font-semibold">escStack</span>, we believe people drive innovation.
                    We’re more than a workplace—we’re a people-first community that grows stronger together.
                    Join us and shape the future of technology.
                </p>
            </div>

            <h2 className="text-2xl font-bold mb-8">Job Openings</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
                <input
                    placeholder="Search jobs..."
                    className="border px-4 py-2 rounded-lg flex-1"
                    onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value.toLowerCase() })
                    }
                />
                <select
                    className="border px-4 py-2 rounded-lg"
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                    <option value="">Location</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    className="border px-4 py-2 rounded-lg"
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                >
                    <option value="">Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Data">Data</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud">Cloud</option>
                    <option value="AI">AI</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Design">Design</option>
                    <option value="QA">QA</option>
                    <option value="Security">Security</option>
                    <option value="Blockchain">Blockchain</option>
                </select>

                <select
                    className="border px-4 py-2 rounded-lg"
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                    <option value="">Workplace Type</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                <select
                    className="border px-4 py-2 rounded-lg"
                    onChange={(e) => setFilters({ ...filters, work: e.target.value })}
                >
                    <option value="">Work Type</option>
                    <option value="Full time">Full time</option>
                    <option value="Part time">Part time</option>
                </select>
            </div>

            {/* Job List */}
            <div className="space-y-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 transition rounded-lg px-2"
                        >
                            <div>
                                <Link href={`/jobs/${job.id}`}>
                                    <h2 className="text-lg font-semibold text-green-700 cursor-pointer hover:underline">
                                        {job.title}
                                    </h2>
                                </Link>
                                <p className="text-sm text-gray-600">Posted {job.posted}</p>
                            </div>
                            <div className="text-sm text-gray-800 mt-2 md:mt-0">
                                <span className="font-medium">{job.type}</span> · {job.location} ·{" "}
                                {job.work}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No jobs match your search.</p>
                )}
            </div>
        </div>
    );
}
