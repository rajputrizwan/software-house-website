'use client'
import React from 'react';

// --- Internal Utility Components (Replacing external libraries) ---

// Icon: ArrowRight (Lucide-style)
const ArrowRight = ({ className = 'h-4 w-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// Icon: Award (Lucide-style)
const Award = ({ className = 'h-4 w-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 18 17 22 15.79 13.88"></polyline></svg>
);

// Badge Component
const Badge = ({ children, variant = 'primary', className = '' }) => {
    let baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors duration-200";
    let variantStyles;

    if (variant === 'secondary') {
        variantStyles = "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    } else {
        variantStyles = "bg-blue-600 text-white"; // Default primary
    }

    return <span className={`${baseStyles} ${variantStyles} ${className}`}>{children}</span>;
};

// Button Component
const Button = ({ children, size = 'md', variant = 'primary', className = '', onClick }) => {
    let baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform active:scale-[0.98]";
    let sizeStyles = size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm';
    let variantStyles;

    if (variant === 'outline') {
        variantStyles = "bg-white text-gray-700 border border-gray-300 dark:bg-transparent dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50";
    } else {
        // Primary style: Cyan gradient with deep shadow for premium feel
        variantStyles = "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl shadow-cyan-500/30 dark:shadow-blue-500/40 hover:from-cyan-500 hover:to-blue-500";
    }

    return <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} onClick={onClick}>{children}</button>;
};

// Simple Link Component (No Next/Link dependency)
const Link = ({ href, children }) => (
    <a href={href} className="no-underline">{children}</a>
);

// Simple Image Component (No Next/Image dependency, uses onerror for robustness)
const Image = ({ src, alt, className = '' }) => (
    <img 
        src={src} 
        alt={alt} 
        className={`object-cover ${className}`} 
        loading="lazy"
        onError={(e) => {
            e.target.onerror = null; 
            e.target.src="https://placehold.co/1600x280/555/FFF?text=Image+Load+Error";
        }}
    />
);


// --- Main CTA Component ---
const CtaSection = () => {
    return (
        <section className="container mx-auto px-6 md:px-10 py-16">
            <div className="
                rounded-3xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-900 
                shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50
                p-8 md:p-12 lg:p-16
            ">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    
                    {/* LEFT COLUMN: Text and Buttons */}
                    <div>
                        <Badge variant="secondary" className="mb-3">
                            Let's build
                        </Badge>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                            Ready to move from idea to <span className="text-blue-600 dark:text-cyan-400">impact?</span>
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">
                            Tell us about your product vision—we'll map a pragmatic plan and 
                            assemble a senior pod to deliver it, guaranteeing velocity and quality.
                        </p>
                        
                        {/* Responsive Button Group */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Book a discovery call
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Our services
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    {/* RIGHT COLUMN: Image and Badge */}
                    <div className="relative order-first md:order-last">
                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/20 dark:shadow-gray-900/50">
                            <Image
                                src="https://cdn.prod.website-files.com/632a1c3a87ee2760b99c5b3c/6633b2d98f727b11e3c5e475_how%20to%20make%20the%20connection%20between%20innovation%20collaboration%20and%20productivity.jpg"
                                alt="Team collaboration"
                                className="w-full h-[250px] md:h-[320px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                            />
                        </div>

                        {/* Floating Badge (Hidden on mobile for cleaner UX) */}
                        <div className="absolute -bottom-4 -right-4 hidden lg:block">
                            <Badge className="shadow-2xl shadow-cyan-600/40 gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-2 border-white/50 dark:border-gray-800">
                                <Award className="h-4 w-4" />
                                5★ client rating
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
