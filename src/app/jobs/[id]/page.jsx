"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

// Expanded Job Data
const jobs = {
    1: {
        title: "Senior Software Engineer - Python/AIML",
        description:
            "We are looking for an experienced engineer skilled in AI/ML and Python.",
        details: {
            description: `You will be responsible for building scalable AI/ML applications and optimizing Python-based solutions for performance.`,
            requirements: [
                "Design and implement AI/ML models and algorithms.",
                "Collaborate with data scientists and product managers.",
                "Optimize Python applications for scalability and performance.",
                "Write clean, maintainable, and efficient code.",
                "Conduct code reviews and mentor junior developers."
            ],
            qualifications: [
                "Bachelor’s degree in Computer Science or related field.",
                "3+ years of experience with Python and ML frameworks.",
                "Experience with TensorFlow, PyTorch, or Scikit-learn.",
                "Strong problem-solving and analytical skills."
            ],
            skills: [
                "Python, AI/ML frameworks",
                "Data structures & algorithms",
                "Cloud platforms (AWS, GCP, or Azure)",
                "Git and CI/CD pipelines",
                "Excellent communication & teamwork"
            ]
        }
    },
    2: {
        title: "Associate DevOps Engineer",
        description: "Work with CI/CD, cloud infrastructure, and automation tools.",
        details: {
            description: `We’re looking for a motivated DevOps Engineer with 6 months to 1 year of experience to support CI/CD, cloud infrastructure, and automation efforts.`,
            requirements: [
                "Assist in development and maintenance of CI/CD pipelines.",
                "Support deployment automation and infrastructure provisioning.",
                "Write and maintain scripts in Bash, Python, or similar languages.",
                "Support containerization with Docker & Kubernetes.",
                "Help maintain cloud infrastructure across AWS, Azure, or GCP."
            ],
            qualifications: [
                "Bachelor’s degree in CS, Software Engineering, or related field.",
                "6 months – 1 year of hands-on DevOps/System Admin experience."
            ],
            skills: [
                "CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI)",
                "Version control with Git",
                "Bash/Python scripting",
                "Cloud platforms (AWS, Azure, GCP)",
                "Monitoring with Prometheus/Grafana/CloudWatch"
            ]
        }
    },
    3: {
        title: "Software Engineer - Data",
        description: "Build and optimize data pipelines and large-scale systems.",
        details: {
            description: `As a Data Engineer, you will build, optimize, and maintain data pipelines, ensuring high availability and reliability of data systems.`,
            requirements: [
                "Design and develop ETL pipelines for structured and unstructured data.",
                "Collaborate with analysts and scientists to deliver clean datasets.",
                "Optimize large-scale distributed systems.",
                "Ensure data security, governance, and compliance."
            ],
            qualifications: [
                "Bachelor’s degree in Computer Science, Data Engineering, or related field.",
                "2+ years of experience in data engineering."
            ],
            skills: [
                "SQL, Python",
                "Big Data tools (Hadoop, Spark)",
                "Cloud data services (BigQuery, Redshift, Snowflake)",
                "Data pipeline orchestration (Airflow, Luigi)",
                "Problem-solving and optimization skills"
            ]
        }
    }
};

export default function JobDescription() {
    const { id } = useParams();
    const job = jobs[id];

    if (!job) return <p className="text-center mt-20 text-gray-600">Job not found.</p>;

    return (
        <div className="max-w-4xl mt-20 mx-auto py-12 px-6 bg-white rounded-xl shadow-lg">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-green-700">{job.title}</h1>

            {/* Short Description */}
            <p className="text-gray-700 mb-8">{job.details.description}</p>

            {/* Requirements */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {job.details.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                    ))}
                </ul>
            </section>

            {/* Qualifications */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {job.details.qualifications.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>
            </section>

            {/* Skills */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {job.details.skills.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </section>

            {/* Apply Button */}
            <Link
                href={`/jobs/${id}/apply`}
                className="bg-green-700 text-white  px-6 py-3 rounded-lg hover:bg-green-800 transition"
            >
                Apply Now
            </Link>
        </div>
    );
}
