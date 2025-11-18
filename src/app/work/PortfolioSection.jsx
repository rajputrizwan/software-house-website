'use client'
import React, { useState, useEffect } from 'react';

// --- Configuration Constants ---
const MAX_SUMMARY_LENGTH = 140;

// --- Internal Utility Components (Icons) ---

// Icon: ArrowRight (Lucide-style)
const ArrowRight = ({ className = 'h-4 w-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
// Icon: Github (Lucide-style)
const IconGithub = ({ className = 'h-5 w-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3 5.44 5.44 0 0 0 12 2c-3.1 0-5.4 1.76-6.4 4.77a5.07 5.07 0 0 0-.09 1.77A5.44 5.44 0 0 0 5.44 14.5c0 5.4 3.3 6.64 6.44 7-.3.5-.6 1.2-.6 2.22l-.04.42"></path></svg>
);
// Icon: Link (Lucide-style)
const IconLink = ({ className = 'h-5 w-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
);
// Icon: X (Close)
const IconX = ({ className = 'h-6 w-6' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


// Helper function to extract Video ID and create Embed URL
const getEmbedData = (url) => {
    const urlRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(urlRegex);
    const videoId = match ? match[1] : null;

    if (!videoId) {
        return { videoId: null, embedUrl: null, thumbnailUrl: null };
    }

    return {
        videoId: videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
};

// --- Real Project Data (Sourced from Search) ---
const PROJECTS = [
    {
        id: 1,
        title: "Real-time Event SaaS Platform",
        category: "Web Application Engineering",
        summary: "A complete, modern Next.js 15 SaaS built with Clerk auth and Stripe integration for real-time event notifications and monitoring. The architecture focuses on high velocity and optimal developer experience, ensuring minimal latency and rapid feature deployment across the entire platform.",
        videoUrl: "https://www.youtube.com/watch?v=vEQlN17miq8",
        technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "TailwindCSS"],
        githubLink: "https://github.com/joschan21/pingpanda",
        liveDemoLink: "https://pingpanda.vercel.app/"
    },
    {
        id: 2,
        title: "Enterprise Mobile Banking App",
        category: "Mobile Apps",
        summary: "A sleek, fully-featured banking application built with React Native/Expo, demonstrating complex UI animations, secure authentication, and transactional integrity. The app includes seamless native module integration for biometrics and offline data synchronization to ensure a smooth user experience.",
        videoUrl: "https://www.youtube.com/watch?v=Pj-K_9bXm9c", 
        technologies: ["React Native", "TypeScript", "Expo", "Native Base", "Animations"],
        githubLink: "https://github.com/MarceloDJunior/banking-app",
        liveDemoLink: "https://github.com/MarceloDJunior/banking-app" 
    },
    {
        id: 3,
        title: "Cloud-Native Voting App Deployment",
        category: "Cloud & DevOps",
        // This summary is intentionally made longer than MAX_SUMMARY_LENGTH to trigger the Read More feature
        summary: "A cutting-edge, real-time DevOps project deploying a cloud-native voting application (featuring React frontend, Golang API, and MongoDB) on AWS EKS. This solution focuses extensively on high availability and fault tolerance, utilizing Kubernetes (K8s) StatefulSets for database persistence, and a full CI/CD pipeline integrated with Helm for zero-downtime rollouts across multiple environments. The infrastructure is fully defined using Terraform for immutable and scalable deployment, ensuring maximum operational efficiency.",
        videoUrl: "https://www.youtube.com/watch?v=pTmIoKUeU-A", 
        technologies: ["AWS EKS", "Kubernetes", "Golang", "Mongo DB", "Helm", "Terraform"],
        githubLink: "https://github.com/N4si/K8s-voting-app",
        liveDemoLink: "https://github.com/N4si/K8s-voting-app"
    },
    {
        id: 4,
        title: "AI Chatbot with RAG & Supabase",
        category: "AI & Intelligence",
        summary: "An open-source, full-stack AI chatbot built on Next.js, Vercel AI SDK, and OpenAI, leveraging Supabase for database and vector embedding storage (RAG). The system is designed for quick response times and context-aware conversation flows.",
        videoUrl: "https://www.youtube.com/watch?v=k3J-r58X-8g", 
        technologies: ["OpenAI", "LangChain", "Supabase", "Vercel AI SDK", "TypeScript"],
        githubLink: "https://github.com/vercel/ai-chatbot", 
        liveDemoLink: "https://vercel.com/templates/next.js/ai-chatbot"
    },
    {
        id: 5,
        title: "Subscription Management SaaS Demo",
        category: "Data & Persistence",
        summary: "The official Stripe Subscriptions starter kit built with Next.js, Postgres, and Drizzle/Prisma, demonstrating robust payment and database integration best practices. It handles webhook security and transactional integrity flawlessly.",
        videoUrl: "https://www.youtube.com/watch?v=qK75rJ8Vq_w", 
        technologies: ["PostgreSQL", "Drizzle/Prisma", "Stripe", "Next.js", "shadcn/ui"],
        githubLink: "https://github.com/nextjs/saas-starter",
        liveDemoLink: "https://saas-starter.vercel.app/"
    },
    {
        id: 6,
        title: "GitHub Actions K8s Runner Scaling",
        category: "Security & Compliance",
        summary: "Deployment of self-hosted GitHub Actions runners on Kubernetes using the ARC operator to enhance control, security, and cost-efficiency for CI/CD pipelines. This pattern reduces vendor lock-in and improves security posture.",
        videoUrl: "https://www.youtube.com/watch?v=IfBGxeh_TgI",
        technologies: ["GitHub Actions", "Kubernetes", "ARC Operator", "CI/CD", "Security"],
        githubLink: "https://github.com/actions-runner-controller/actions-runner-controller",
        liveDemoLink: "https://github.com/actions-runner-controller/actions-runner-controller"
    },
];

const CATEGORIES = [
    "All Works",
    ...new Set(PROJECTS.map(p => p.category))
];

// --- Sub-Component: Tech Chip (from previous file for consistency) ---
const TechChip = ({ name }) => (
    <div className="
        inline-flex items-center px-3 py-0.5 text-xs font-medium 
        text-blue-700 bg-blue-100 rounded-full 
        dark:bg-blue-900/40 dark:text-blue-300
        whitespace-nowrap cursor-default
    ">
        {name}
    </div>
);

// --- Sub-Component: Modal for Full Description ---
const ProjectDetailsModal = ({ project, onClose }) => {
    // Lock body scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const { embedUrl } = getEmbedData(project.videoUrl);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
            onClick={onClose} // Close on backdrop click
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Modal Header */}
                <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {project.title}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <IconX />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 space-y-6">
                    {/* Embedded Video (optional, for continuity) */}
                    {embedUrl && (
                        <div className="relative pt-[56.25%] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={embedUrl}
                                title={`${project.title} Video Demo`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>
                        </div>
                    )}

                    {/* Full Description */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Project Summary</h3>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                            {project.summary}
                        </p>
                    </div>

                    {/* Key Metrics / Tech Stack */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Key Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => <TechChip key={tech} name={tech} />)}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <a 
                            href={project.liveDemoLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 text-center flex items-center justify-center text-base font-bold text-white bg-blue-600 dark:bg-cyan-500 rounded-lg px-4 py-3 hover:bg-blue-700 dark:hover:bg-cyan-600 transition-colors shadow-md"
                        >
                            Live Demo
                            <IconLink className="w-5 h-5 ml-2" />
                        </a>
                        <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 text-center flex items-center justify-center text-base font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md"
                        >
                            View Code
                            <IconGithub className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Sub-Component: Project Card ---
const ProjectCard = ({ project, onReadMore }) => {
    const { videoId, embedUrl, thumbnailUrl } = getEmbedData(project.videoUrl);
    const [videoLoaded, setVideoLoaded] = useState(false);
    
    // Logic for Read More
    const needsReadMore = project.summary.length > MAX_SUMMARY_LENGTH;
    const truncatedSummary = needsReadMore 
        ? project.summary.substring(0, MAX_SUMMARY_LENGTH) + '...'
        : project.summary;

    if (!videoId) {
        return (
            <div className="
                h-full flex flex-col justify-between 
                bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl 
                border border-gray-200 dark:border-gray-700 p-6
            ">
                <h3 className="text-2xl font-extrabold text-red-500 mb-3">Video Error</h3>
                <p className="text-gray-600 dark:text-gray-400">Invalid video URL provided for this project.</p>
            </div>
        );
    }

    return (
        // Added h-full and flex-col for equal height
        <div className="
            h-full flex flex-col
            bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl 
            transition-transform duration-500 ease-in-out hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-cyan-400/20
            border border-gray-200 dark:border-gray-700
            transform hover:-translate-y-1
        ">
            
            {/* Video Demo Area - Aspect Ratio Fix */}
            <div className="relative pt-[56.25%] bg-gray-900 flex-shrink-0"> {/* flex-shrink-0 ensures video maintains size */}
                
                {/* Fallback/Placeholder Image */}
                {!videoLoaded && (
                    <img 
                        src={thumbnailUrl} 
                        alt={`Thumbnail for ${project.title}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1600x900/1e293b/94a3b8?text=Video+Blocked"; }}
                    />
                )}

                {/* Iframe for the video */}
                <iframe
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    src={embedUrl}
                    title={`${project.title} Video Demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setVideoLoaded(true)}
                    key={videoId} 
                ></iframe>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow"> {/* flex-grow ensures content area expands */}
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 leading-snug">
                    {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base mb-4 flex-grow"> {/* flex-grow pushes buttons to the bottom */}
                    {truncatedSummary}
                    {needsReadMore && (
                        <button
                            onClick={() => onReadMore(project)}
                            className="text-blue-600 dark:text-cyan-400 hover:underline ml-1 font-semibold"
                        >
                            Read more
                        </button>
                    )}
                </p>

                {/* Technologies Used */}
                <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
                    {project.technologies.map(tech => <TechChip key={tech} name={tech} />)}
                </div>

                {/* Links and CTA - Standardized Button Look */}
                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
                    <a 
                        href={project.liveDemoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        // Standardized button look and fixed size
                        className="flex-1 text-center flex items-center justify-center text-base font-bold text-white bg-blue-600 dark:bg-cyan-500 rounded-lg py-3 hover:bg-blue-700 dark:hover:bg-cyan-600 transition-colors shadow-md"
                    >
                        Live Demo
                        <IconLink className="w-5 h-5 ml-2" />
                    </a>
                    <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        // Standardized button look and fixed size
                        className="flex-1 text-center flex items-center justify-center text-base font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg py-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md"
                    >
                        View Code
                        <IconGithub className="w-5 h-5 ml-2" />
                    </a>
                </div>
            </div>
        </div>
    );
};


// --- Main Portfolio Component ---
const PortfolioSection = () => {
    const [activeCategory, setActiveCategory] = useState("All Works");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = activeCategory === "All Works"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeCategory);

    const handleReadMore = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <>
            <section id="portfolio" className="container mx-auto px-6 md:px-10 py-20 bg-gray-50 dark:bg-gray-900">
                
                {/* --- Heading --- */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-400">Work History</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                        A curated selection of the most impactful products we've brought to life, built with precision and modern architecture.
                    </p>
                </div>

                {/* --- Tabbed Filtering System (UX) --- */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-200 dark:border-gray-700 pb-2 overflow-x-auto">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap
                                ${activeCategory === category
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40 dark:bg-cyan-500 dark:shadow-cyan-500/40'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* --- Projects Grid (UI) --- */}
                {/* The grid now uses items-stretch to apply h-full to all children */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} onReadMore={handleReadMore} />
                        ))
                    ) : (
                        <div className="md:col-span-2 lg:col-span-3 text-center py-10">
                            <p className="text-xl text-gray-500 dark:text-gray-400">
                                No projects found in the **{activeCategory}** category yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>

                {/* --- Secondary CTA (Post-Portfolio) --- */}
                <div className="text-center mt-20">
                    <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                        See something you like? Let's build your next success story.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 
                        bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl shadow-cyan-500/30 dark:shadow-blue-500/40 hover:from-cyan-500 hover:to-blue-500">
                        Get Started Now
                        <ArrowRight className="h-5 w-5 ml-2" />
                    </a>
                </div>

            </section>
            
            {/* --- Modal Container --- */}
            {isModalOpen && selectedProject && (
                <ProjectDetailsModal 
                    project={selectedProject} 
                    onClose={handleCloseModal} 
                />
            )}
        </>
    );
};

export default PortfolioSection;
