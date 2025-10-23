'use client'
export default function TechStack() {
    // 1. Web Application Engineering: Code Brackets
    const IconCode = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    );
    // 2. Mobile Apps: Smartphone (Represents mobile development)
    const IconSmartphone = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
    );
    // 3. Cloud & DevOps: Cloud (Represents infrastructure and deployment)
    const IconCloud = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
    );
    // 4. AI & Data: Brain (Represents advanced logic and machine learning)
    const IconBrain = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 0 0-3 3c0 1.76.22 4.41 2.35 6.44A1.62 1.62 0 0 0 12 18c1.77 0 3-.25 3-2.25 0-1.07-.12-2.35-.91-3.65C13.62 10.98 12 9.77 12 9s1.39-2 2-2h.01"></path><path d="M12 5a3 3 0 0 1 3 3c0 1.76-.22 4.41-2.35 6.44A1.62 1.62 0 0 1 12 18c-1.77 0-3-.25-3-2.25 0-1.07.12-2.35.91-3.65C10.38 10.98 12 9.77 12 9s-1.39-2-2-2h-.01"></path><path d="M12 2v20"></path><path d="M16 16.5c-2.35 0-4.34-1.2-5.46-3.15C9.42 11.4 8.23 9.4 8.23 7.8A4.18 4.18 0 0 1 12 4c2.83 0 5 2.1 5 5s-1.76 4.41-3.65 6.44c-1.24 1.34-2.5 1.56-3.35 1.56"></path></svg>
    );
    // 5. Data & Persistence: Database (Represents storage and retrieval)
    const IconDatabase = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
    );
    // 6. Security & Compliance: Shield (NEW CARD)
    const IconShield = () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    );
    // --- Data Categorization with Icon Mapping (6 Categories) ---
    const CATEGORIZED_TECH = [
        {
            category: "Frontend & UI/UX",
            description: "Performant, mobile-first interfaces using the leading modern web frameworks.",
            technologies: ["Next.js", "TypeScript", "React Native", "TailwindCSS"],
            icon: IconCode
        },
        {
            category: "Backend & API",
            description: "Scalable, secure, and resilient APIs built for enterprise-grade performance.",
            technologies: ["Node.js", "Go", "Python", "tRPC", "GraphQL", "Monorepos"],
            icon: IconSmartphone // Reusing a general icon, but Code is a better fit for Front/Backend
        },
        {
            category: "Data & Persistence",
            description: "Robust, high-availability data storage, caching, and state management.",
            technologies: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"],
            icon: IconDatabase
        },
        {
            category: "Cloud & DevOps",
            description: "Cloud-native infrastructure, automated CI/CD, and container orchestration.",
            technologies: ["Kafka", "Docker", "Kubernetes", "Terraform", "AWS", "GCP", "Azure"],
            icon: IconCloud
        },
        {
            category: "AI & Intelligence",
            description: "Integrating modern machine learning and vector databases for intelligent systems.",
            technologies: ["LangChain", "OpenAI", "Pinecone", "ETL/Data Lakes"],
            icon: IconBrain
        },
        {
            category: "Security & Compliance",
            description: "Shift-left security with SAST/DAST, secrets hygiene, and compliance-ready build pipelines.",
            technologies: ["OWASP ASVS", "SOC2", "Zero-Trust", "SAST/DAST", "Secrets Hygiene"],
            icon: IconShield
        },
    ];

    // --- Sub-Component for individual tech chips ---
    const TechChip = ({ name }) => (
        <div className="
        inline-flex items-center px-4 py-1.5 text-sm font-medium 
        text-blue-700 bg-blue-100 rounded-full 
        dark:bg-blue-900/40 dark:text-blue-300
        transition-colors duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/50
        whitespace-nowrap cursor-default
    ">
            {name}
        </div>
    );

    // --- Sub-Component for Category Card ---
    const CategoryCard = ({ category, description, technologies, IconComponent }) => (
        <div className="
        flex flex-col p-8 h-full bg-white dark:bg-gray-800 rounded-xl 
        shadow-xl border-t-4 border-t-transparent
        transition-all duration-300 ease-out 
        hover:shadow-2xl hover:border-t-blue-500 dark:hover:border-t-blue-400
        transform hover:translate-y-[-2px]
    ">
            <div className="flex items-start space-x-4 mb-4 text-blue-600 dark:text-blue-400">
                {/* Render the specific icon component */}
                <IconComponent />
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
                    {category}
                </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-base">
                {description}
            </p>

            {/* Chips for the individual technologies */}
            <div className="mt-auto flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <TechChip key={tech} name={tech} />
                ))}
            </div>
        </div>
    );
    return (
        <section className="container mx-auto px-6 md:px-10 py-16 md:py-24 bg-gray-100 dark:bg-gray-900">

            {/* -------------------- HEADING SECTION -------------------- */}
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">

                <div className="inline-flex items-center justify-center p-3 bg-blue-200/50 dark:bg-blue-900/30 rounded-full mb-4 text-blue-700 dark:text-blue-300 animate-pulse-slow">
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                    </svg>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Our{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-400 dark:to-blue-400">
                        Systematic Stack
                    </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                    We select and structure technologies based on performance, architectural fit, and long-term stability, ensuring your product is built to last.
                </p>
            </div>

            {/* -------------------- CATEGORIZED TECH GRID (6 Cards) -------------------- */}
            {/* Setting the grid to 3 columns on large screens for the 2x3 layout of 6 cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {CATEGORIZED_TECH.map((categoryData) => (
                    <CategoryCard
                        key={categoryData.category}
                        category={categoryData.category}
                        description={categoryData.description}
                        technologies={categoryData.technologies}
                        IconComponent={categoryData.icon}
                    />
                ))}
            </div>

            {/* -------------------- Custom Tailwind Animation Definition (for 'animate-pulse-slow') -------------------- */}
            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </section>

    );
}