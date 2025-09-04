// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Award } from "lucide-react";

// // Example Data
// const COMPANY = {
//   name: "escStack",
//   tagline:
//     "We craft high-quality software that scales startups and enterprises alike.",
//   ctaHref: "/contact",
//   ctaLabel: "Get in Touch",
//   mission:
//     "Deliver modern, scalable, and robust digital products that create real impact.",
//   vision:
//     "To be the global leader in custom software solutions, enabling businesses to thrive.",
// };

// const STATS = [
//   { icon: Award, value: "50+", label: "Projects" },
//   { icon: Award, value: "20+", label: "Clients" },
//   { icon: Award, value: "5+", label: "Awards" },
//   { icon: Award, value: "10+", label: "Countries" },
//   { icon: Award, value: "100%", label: "Success Rate" },
// ];

// const SERVICES = [
//   { icon: Award, label: "Web Development" },
//   { icon: Award, label: "Mobile Apps" },
//   { icon: Award, label: "Cloud Solutions" },
//   { icon: Award, label: "UI/UX Design" },
//   { icon: Award, label: "Product Strategy" },
//   { icon: Award, label: "AI & Automation" },
// ];

// const VALUES = [
//   {
//     icon: Award,
//     title: "Integrity",
//     desc: "We are transparent, honest, and ethical in everything we do.",
//   },
//   {
//     icon: Award,
//     title: "Innovation",
//     desc: "We constantly push the boundaries of technology and design.",
//   },
//   {
//     icon: Award,
//     title: "Excellence",
//     desc: "We strive for perfection and deliver beyond expectations.",
//   },
//   {
//     icon: Award,
//     title: "Collaboration",
//     desc: "We believe in teamwork and strong partnerships with clients.",
//   },
// ];

// const FOUNDERS = [
//   { name: "Alice Johnson", role: "CEO & Founder" },
//   { name: "Bob Smith", role: "CTO & Co-Founder" },
//   { name: "Charlie Kim", role: "COO & Co-Founder" },
// ];

// // Animations
// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };
// const containerStagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// // Section Wrapper
// const Section = ({ children, className }) => (
//   <section className={`py-16 md:py-20 ${className || ""}`}>{children}</section>
// );

// export default function AboutPage() {
//   return (
//     <div className="relative w-full bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
//       {/* Background accents */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//       >
//         <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-600/20" />
//         <div className="absolute top-1/2 -right-24 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-400/40 blur-3xl dark:bg-blue-700/20" />
//         <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-800/20" />
//       </div>

//       {/* Hero */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={containerStagger}
//           className="mx-auto max-w-6xl text-center"
//         >
//           <motion.h1
//             variants={fadeUp}
//             className="text-4xl md:text-5xl font-bold tracking-tight"
//           >
//             About{" "}
//             <span className="text-blue-600 dark:text-blue-400">
//               {COMPANY.name}
//             </span>
//           </motion.h1>
//           <motion.p
//             variants={fadeUp}
//             className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-300"
//           >
//             {COMPANY.tagline}
//           </motion.p>
//           <motion.div
//             variants={fadeUp}
//             className="mt-6 flex justify-center gap-3"
//           >
//             <Button size="lg" asChild>
//               <a href={COMPANY.ctaHref}>{COMPANY.ctaLabel}</a>
//             </Button>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             variants={fadeUp}
//             className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
//           >
//             {STATS.map(({ icon: Icon, label, value }) => (
//               <Card
//                 key={label}
//                 className="rounded-2xl border border-gray-200 dark:border-gray-700/50
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg
//                   shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//               >
//                 <CardContent className="flex flex-col items-center gap-1 p-4">
//                   <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                   <div className="text-xl font-semibold">{value}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {label}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </motion.div>
//         </motion.div>
//       </Section>

//       {/* Mission & Vision */}
//       <Section className="px-4">
//         <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-2">
//           {[
//             { title: "Our Mission", desc: COMPANY.mission },
//             { title: "Our Vision", desc: COMPANY.vision },
//           ].map((item) => (
//             <motion.div
//               key={item.title}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.25 }}
//               variants={fadeUp}
//             >
//               <Card
//                 className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50
//                 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//               >
//                 <CardHeader>
//                   <CardTitle className="text-2xl">{item.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="text-muted-foreground">
//                   {item.desc}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </Section>

//       {/* What we do */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-center text-3xl font-semibold"
//           >
//             What We Do
//           </motion.h2>
//           <motion.p
//             variants={fadeUp}
//             className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground"
//           >
//             From strategy to shipping, we partner with startups and enterprises
//             to build products that scale and delight.
//           </motion.p>

//           <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {SERVICES.map(({ icon: Icon, label }) => (
//               <motion.div
//                 key={label}
//                 variants={fadeUp}
//                 whileHover={{ y: -4 }}
//                 className="group"
//               >
//                 <Card
//                   className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardContent className="flex items-center gap-3 p-5">
//                     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/40">
//                       <Icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
//                     </span>
//                     <div className="font-medium">{label}</div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Values */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-3xl font-semibold text-center"
//           >
//             Our Values
//           </motion.h2>
//           <div className="mt-8 grid gap-6 md:grid-cols-2">
//             {VALUES.map(({ icon: Icon, title, desc }) => (
//               <motion.div key={title} variants={fadeUp}>
//                 <Card
//                   className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex items-start gap-4">
//                       <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/20">
//                         <Icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
//                       </span>
//                       <div>
//                         <h3 className="text-xl font-semibold">{title}</h3>
//                         <p className="mt-1 text-muted-foreground">{desc}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Leadership */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-3xl font-semibold text-center"
//           >
//             Leadership
//           </motion.h2>
//           <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {FOUNDERS.map((f) => (
//               <motion.div key={f.name} variants={fadeUp} whileHover={{ y: -3 }}>
//                 <Card
//                   className="rounded-2xl border border-gray-200 dark:border-gray-700/50
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-lg">{f.name}</CardTitle>
//                     <div className="text-sm text-muted-foreground">
//                       {f.role}
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pb-6">
//                     <Badge variant="secondary">Founder</Badge>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mx-auto mt-8 max-w-3xl text-center text-muted-foreground">
//             Our team includes senior engineers, full-stack developers, junior
//             developers, software developers, and project managers—over 50
//             professionals collaborating to deliver excellence.
//           </div>
//         </motion.div>
//       </Section>

//       {/* Why escStack */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-center text-3xl font-semibold"
//           >
//             Why {COMPANY.name}?
//           </motion.h2>
//           <div className="mt-8 grid gap-6 md:grid-cols-2">
//             {[
//               {
//                 title: "High-Quality Products",
//                 desc: "We ship polished, maintainable software with clean, scalable architectures.",
//               },
//               {
//                 title: "Unique Capabilities",
//                 desc: "We take on complex, custom builds others avoid—and make them shine.",
//               },
//               {
//                 title: "Trusted by Clients",
//                 desc: "Long-term partnerships across local and global markets.",
//               },
//               {
//                 title: "Value & Affordability",
//                 desc: "Premium engineering without enterprise bloat—transparent pricing always.",
//               },
//             ].map((item) => (
//               <motion.div key={item.title} variants={fadeUp}>
//                 <Card
//                   className="rounded-2xl border border-gray-200 dark:border-gray-700/50
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardHeader>
//                     <CardTitle className="text-xl">{item.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="text-muted-foreground">
//                     {item.desc}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Achievements */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-3xl font-semibold text-center"
//           >
//             Achievements
//           </motion.h2>
//           <motion.p
//             variants={fadeUp}
//             className="mt-2 text-center text-muted-foreground"
//           >
//             Recognized with multiple awards for innovation and client success.
//           </motion.p>
//           <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {["Innovation Award", "Top Software House", "Customer Delight"].map(
//               (t) => (
//                 <motion.div key={t} variants={fadeUp} whileHover={{ y: -4 }}>
//                   <Card
//                     className="rounded-2xl border border-gray-200 dark:border-gray-700/50
//                     bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                   >
//                     <CardContent className="flex items-center gap-3 p-6">
//                       <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                       <div className="font-medium">{t}</div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               )
//             )}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Testimonials */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-center text-3xl font-semibold"
//           >
//             What Clients Say
//           </motion.h2>
//           <div className="mt-8 grid gap-6 md:grid-cols-2">
//             {[1, 2].map((i) => (
//               <motion.div key={i} variants={fadeUp}>
//                 <Card
//                   className="rounded-2xl border border-gray-200 dark:border-gray-700/50
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardContent className="p-6">
//                     <p className="text-foreground">
//                       "escStack delivered beyond expectations—great
//                       communication, clean code, and on-time releases."
//                     </p>
//                     <Separator className="my-4" />
//                     <div className="text-sm text-muted-foreground">
//                       Edit this with your real testimonial…
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* CTA */}
//       <Section className="px-4">
//         <div className="mx-auto w-full max-w-4xl">
//           <Card
//             className="rounded-2xl border border-gray-200 dark:border-gray-700/50
//             bg-gradient-to-r from-blue-600 to-indigo-600
//             text-white shadow-xl"
//           >
//             <CardContent className="flex flex-col md:flex-row items-center justify-between py-12 px-8 gap-6">
//               {/* Text */}
//               <div className="text-center md:text-left">
//                 <h3 className="text-2xl md:text-3xl font-bold mb-3">
//                   Ready to Build With escStack?
//                 </h3>
//                 <p className="text-lg opacity-90 max-w-lg">
//                   Join hundreds of businesses scaling faster with our innovative
//                   and future-ready solutions. Let's bring your idea to life.
//                 </p>
//               </div>

//               {/* Button */}
//               <div>
//                 <a
//                   href="/contact"
//                   className="px-6 py-3 rounded-xl font-semibold text-blue-600
//                   bg-white hover:bg-gray-100 transition shadow-md"
//                 >
//                   Get in Touch
//                 </a>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </Section>
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect, useRef } from "react";
// import Head from "next/head";

// export default function AboutUs() {
//   const [activeTab, setActiveTab] = useState("mission");
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRefs = {
//     mission: useRef(null),
//     team: useRef(null),
//     values: useRef(null),
//     story: useRef(null),
//   };

//   useEffect(() => {
//     setIsVisible(true);

//     const observerOptions = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.3,
//     };

//     const observerCallback = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("animate-fade-in");
//         }
//       });
//     };

//     const observers = Object.values(sectionRefs).map((ref) => {
//       if (ref.current) {
//         const observer = new IntersectionObserver(
//           observerCallback,
//           observerOptions
//         );
//         observer.observe(ref.current);
//         return observer;
//       }
//     });

//     return () => {
//       observers.forEach((observer) => observer && observer.disconnect());
//     };
//   }, []);

//   const teamMembers = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "CEO & Founder",
//       bio: "Tech enthusiast with 15+ years of industry experience. Passionate about innovation and building inclusive tech communities.",
//       image: "/api/placeholder/300/300",
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "CTO",
//       bio: "Software architect specializing in scalable systems. Loves solving complex problems with elegant solutions.",
//       image: "/api/placeholder/300/300",
//     },
//     {
//       id: 3,
//       name: "Elena Rodriguez",
//       role: "Lead Designer",
//       bio: "Award-winning designer with a focus on user-centered experiences. Believes good design should be accessible to all.",
//       image: "/api/placeholder/300/300",
//     },
//     {
//       id: 4,
//       name: "David Kim",
//       role: "Marketing Director",
//       bio: "Growth strategist with a talent for building authentic brand stories that resonate with global audiences.",
//       image: "/api/placeholder/placeholder/300/300",
//     },
//   ];

//   const values = [
//     {
//       title: "Innovation",
//       description:
//         "We constantly push boundaries and explore new possibilities to deliver cutting-edge solutions.",
//       icon: "💡",
//     },
//     {
//       title: "Integrity",
//       description:
//         "We do what's right, not what's easy. Transparency and honesty guide all our decisions.",
//       icon: "🤝",
//     },
//     {
//       title: "Collaboration",
//       description:
//         "We believe the best ideas emerge when diverse perspectives work together toward a common goal.",
//       icon: "🌐",
//     },
//     {
//       title: "Impact",
//       description:
//         "We measure success by the positive change we create for our clients, community, and world.",
//       icon: "🎯",
//     },
//   ];

//   const milestones = [
//     {
//       year: "2015",
//       event: "Company founded with a vision to revolutionize the industry",
//     },
//     {
//       year: "2017",
//       event: "Secured Series A funding and expanded to international markets",
//     },
//     { year: "2019", event: "Launched flagship product to critical acclaim" },
//     { year: "2021", event: "Reached 1 million happy customers worldwide" },
//     {
//       year: "2023",
//       event: "Recognized as industry leader with multiple awards",
//     },
//   ];

//   return (
//     <div
//       className={`min-h-screen transition-opacity duration-1000 ${
//         isVisible ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <Head>
//         <title>About Us | Our Story, Team & Mission</title>
//         <meta
//           name="description"
//           content="Learn about our company's mission, values, and the talented team behind our success."
//         />
//       </Head>

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-800 z-0"></div>
//         <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

//         <div className="relative z-10 text-center text-white px-4 max-w-4xl">
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
//             We Create The{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
//               Future
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
//             Dedicated to innovation, excellence, and making a positive impact
//             through technology and design.
//           </p>
//           <button className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 animate-fade-in-more-delay">
//             Explore Our Story
//           </button>
//         </div>

//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <svg
//             className="w-6 h-6 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             ></path>
//           </svg>
//         </div>
//       </section>

//       {/* Navigation Tabs */}
//       <nav className="sticky top-0 z-50 bg-white shadow-md">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center space-x-2 md:space-x-8">
//             {["mission", "story", "team", "values"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   sectionRefs[tab].current.scrollIntoView({
//                     behavior: "smooth",
//                   });
//                 }}
//                 className={`py-4 px-2 md:px-4 font-medium capitalize transition-all duration-300 ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-blue-500"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Mission Section */}
//       <section ref={sectionRefs.mission} className="py-20 px-4 bg-gray-50">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h2>
//             <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-3xl font-bold mb-6">
//                 Empowering innovation through technology
//               </h3>
//               <p className="text-lg text-gray-700 mb-6">
//                 We believe technology should be a force for good, solving
//                 real-world problems and creating opportunities for everyone. Our
//                 mission is to build products that are not only powerful and
//                 innovative but also accessible and user-friendly.
//               </p>
//               <p className="text-lg text-gray-700">
//                 Through relentless focus on quality, sustainability, and ethical
//                 practices, we aim to set new standards in our industry while
//                 making a positive impact on the world around us.
//               </p>
//             </div>

//             <div className="relative">
//               <div className="bg-blue-600 rounded-2xl overflow-hidden aspect-video shadow-xl transform hover:scale-105 transition-transform duration-500">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 flex items-center justify-center">
//                   <span className="text-white text-2xl font-bold">
//                     Visualizing The Future
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Story Section */}
//       <section ref={sectionRefs.story} className="py-20 px-4 bg-white">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
//             <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
//           </div>

//           <div className="relative">
//             {/* Timeline */}
//             <div className="space-y-12">
//               {milestones.map((milestone, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col md:flex-row items-start"
//                 >
//                   <div className="md:w-1/4 mb-4 md:mb-0">
//                     <div className="bg-blue-100 text-blue-800 font-bold py-2 px-4 rounded-full inline-block">
//                       {milestone.year}
//                     </div>
//                   </div>
//                   <div className="md:w-3/4">
//                     <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//                       <p className="text-lg">{milestone.event}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Vertical line */}
//             <div className="absolute left-4 md:left-1/4 md:transform md:-translate-x-2 top-0 bottom-0 w-1 bg-blue-200 -z-10 hidden md:block"></div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section ref={sectionRefs.team} className="py-20 px-4 bg-gray-50">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//               Meet Our Team
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Diverse talents united by a common passion for innovation and
//               excellence
//             </p>
//             <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member) => (
//               <div
//                 key={member.id}
//                 className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
//               >
//                 <div className="h-60 bg-gradient-to-r from-cyan-400 to-blue-500 relative overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
//                     <div>
//                       <h3 className="text-white text-xl font-bold">
//                         {member.name}
//                       </h3>
//                       <p className="text-blue-200">{member.role}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <p className="text-gray-600">{member.bio}</p>
//                   <div className="flex mt-6 space-x-4">
//                     {["linkedin", "twitter", "github"].map((social) => (
//                       <div
//                         key={social}
//                         className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors duration-300"
//                       >
//                         <span className="text-gray-600 text-sm">{social}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section ref={sectionRefs.values} className="py-20 px-4 bg-white">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               The principles that guide everything we do
//             </p>
//             <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
//               >
//                 <div className="text-4xl mb-6">{value.icon}</div>
//                 <h3 className="text-xl font-bold mb-4">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-800 text-white">
//         <div className="container mx-auto max-w-4xl text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Ready to Create Something Amazing Together?
//           </h2>
//           <p className="text-xl mb-10 max-w-2xl mx-auto">
//             Let's discuss how we can help you achieve your goals and bring your
//             vision to life.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-all duration-300 transform hover:scale-105">
//               Contact Us
//             </button>
//             <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
//               View Our Work
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-400 py-12 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-white text-lg font-bold mb-4">Company</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Press
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-white text-lg font-bold mb-4">Products</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Pricing
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Use Cases
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Testimonials
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Documentation
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     API Reference
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Community
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Support
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-white text-lg font-bold mb-4">Connect</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Twitter
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     LinkedIn
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Facebook
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors duration-300"
//                   >
//                     Instagram
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-12 pt-8 text-center">
//             <p>
//               © {new Date().getFullYear()} Company Name. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>

//       <style jsx global>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fadeIn 1s ease-out forwards;
//         }

//         .animate-fade-in-delay {
//           opacity: 0;
//           animation: fadeIn 1s ease-out 0.3s forwards;
//         }

//         .animate-fade-in-more-delay {
//           opacity: 0;
//           animation: fadeIn 1s ease-out 0.6s forwards;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLightbulb,
  FaHandshake,
  FaGlobe,
  FaBullseye,
  FaRocket,
  FaBriefcase,
  FaLaugh,
  FaTrophy,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaMedium,
  FaEnvelope,
  FaChevronDown,
  FaUsers,
  FaProjectDiagram,
  FaFlag,
  FaHeart,
} from "react-icons/fa";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTeamMember, setHoveredTeamMember] = useState(null);

  const sectionRefs = {
    mission: useRef(null),
    team: useRef(null),
    values: useRef(null),
    story: useRef(null),
  };

  useEffect(() => {
    setIsVisible(true);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    };

    const observers = Object.values(sectionRefs).map((ref) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions
        );
        observer.observe(ref.current);
        return observer;
      }
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Tech enthusiast with 15+ years of industry experience. Passionate about innovation and building inclusive tech communities.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#",
      },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      bio: "Software architect specializing in scalable systems. Loves solving complex problems with elegant solutions.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Lead Designer",
      bio: "Award-winning designer with a focus on user-centered experiences. Believes good design should be accessible to all.",
      image: "/api/placeholder/300/300",
      social: {
        behance: "#",
        dribbble: "#",
        instagram: "#",
      },
    },
    {
      id: 4,
      name: "David Kim",
      role: "Marketing Director",
      bio: "Growth strategist with a talent for building authentic brand stories that resonate with global audiences.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#",
        medium: "#",
      },
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push boundaries and explore new possibilities to deliver cutting-edge solutions.",
      icon: <FaLightbulb className="text-4xl mb-6 text-amber-400" />,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Integrity",
      description:
        "We do what's right, not what's easy. Transparency and honesty guide all our decisions.",
      icon: <FaHandshake className="text-4xl mb-6 text-emerald-400" />,
      color: "from-emerald-400 to-green-500",
    },
    {
      title: "Collaboration",
      description:
        "We believe the best ideas emerge when diverse perspectives work together toward a common goal.",
      icon: <FaGlobe className="text-4xl mb-6 text-cyan-400" />,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Impact",
      description:
        "We measure success by the positive change we create for our clients, community, and world.",
      icon: <FaBullseye className="text-4xl mb-6 text-violet-400" />,
      color: "from-violet-400 to-purple-500",
    },
  ];

  const milestones = [
    {
      year: "2015",
      event: "Company founded with a vision to revolutionize the industry",
      icon: <FaRocket className="text-xl mr-2 text-blue-500" />,
    },
    {
      year: "2017",
      event: "Secured Series A funding and expanded to international markets",
      icon: <FaBriefcase className="text-xl mr-2 text-green-500" />,
    },
    {
      year: "2019",
      event: "Launched flagship product to critical acclaim",
      icon: <FaLaugh className="text-xl mr-2 text-yellow-500" />,
    },
    {
      year: "2021",
      event: "Reached 1 million happy customers worldwide",
      icon: <FaGlobe className="text-xl mr-2 text-cyan-500" />,
    },
    {
      year: "2023",
      event: "Recognized as industry leader with multiple awards",
      icon: <FaTrophy className="text-xl mr-2 text-amber-500" />,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const socialIcons = {
    linkedin: <FaLinkedin className="text-lg" />,
    twitter: <FaTwitter className="text-lg" />,
    github: <FaGithub className="text-lg" />,
    behance: <FaBehance className="text-lg" />,
    dribbble: <FaDribbble className="text-lg" />,
    instagram: <FaInstagram className="text-lg" />,
    medium: <FaMedium className="text-lg" />,
    email: <FaEnvelope className="text-lg" />,
  };

  return (
    <div
      className={`min-h-screen transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Head>
        <title>About Us | Our Story, Team & Mission</title>
        <meta
          name="description"
          content="Learn about our company's mission, values, and the talented team behind our success."
        />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-800 z-0">
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(120, 119, 216, 0.3) 0%, transparent 40%),
                                radial-gradient(circle at 80% 70%, rgba(253, 203, 110, 0.3) 0%, transparent 40%)`,
              backgroundSize: "50% 50%",
            }}
          ></motion.div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We Create The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Future
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dedicated to innovation, excellence, and making a positive impact
            through technology and design.
          </motion.p>
          <motion.button
            className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Story
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        >
          <FaChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      {/* <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-2 md:space-x-8">
            {[
              { id: "mission", label: "Mission" },
              { id: "story", label: "Story" },
              { id: "team", label: "Team" },
              { id: "values", label: "Values" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  sectionRefs[tab.id].current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className={`py-4 px-2 md:px-4 font-medium transition-all duration-300 flex items-center ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </nav> */}

      {/* Mission Section */}
      <section
        ref={sectionRefs.mission}
        className="py-20 px-4 bg-gray-50/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-6">
                Empowering innovation through technology
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                We believe technology should be a force for good, solving
                real-world problems and creating opportunities for everyone. Our
                mission is to build products that are not only powerful and
                innovative but also accessible and user-friendly.
              </p>
              <p className="text-lg text-gray-700">
                Through relentless focus on quality, sustainability, and ethical
                practices, we aim to set new standards in our industry while
                making a positive impact on the world around us.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-blue-600 rounded-2xl overflow-hidden aspect-video shadow-xl transform transition-transform duration-500 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 flex items-center justify-center">
                  <motion.div
                    className="text-white text-2xl font-bold flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <FaLightbulb className="mr-3 text-amber-300" />
                    Visualizing The Future
                  </motion.div>
                </div>
                {/* Animated elements inside the box */}
                <motion.div
                  className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/20"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-cyan-400/30"
                  animate={{ scale: [1, 1.8, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        ref={sectionRefs.story}
        className="py-20 px-4 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="relative">
            {/* Timeline */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="md:w-1/4 mb-4 md:mb-0 flex items-center">
                    <div className="bg-blue-100 text-blue-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                      {milestone.icon}
                      {milestone.year}
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <motion.div
                      className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <p className="text-lg">{milestone.event}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/4 md:transform md:-translate-x-2 top-0 bottom-0 w-1 bg-blue-200 -z-10 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={sectionRefs.team}
        className="py-20 px-4 bg-gray-50/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diverse talents united by a common passion for innovation and
              excellence
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl relative group"
                variants={itemVariants}
                onHoverStart={() => setHoveredTeamMember(member.id)}
                onHoverEnd={() => setHoveredTeamMember(null)}
                whileHover={{ y: -10 }}
              >
                <div className="h-60 bg-gradient-to-r from-cyan-400 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold">
                        {member.name}
                      </h3>
                      <p className="text-blue-200">{member.role}</p>
                    </div>
                  </div>

                  {/* Animated social links */}
                  <motion.div
                    className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="flex space-x-4">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <motion.a
                          key={platform}
                          href={url}
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm"
                          whileHover={{
                            scale: 1.2,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          }}
                          whileTap={{ scale: 0.9 }}
                          title={platform}
                        >
                          {socialIcons[platform]}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={sectionRefs.values}
        className="py-20 px-4 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                number: "50+",
                label: "Team Members",
                icon: <FaUsers className="text-3xl mb-4 mx-auto" />,
              },
              {
                number: "200+",
                label: "Projects Completed",
                icon: <FaProjectDiagram className="text-3xl mb-4 mx-auto" />,
              },
              {
                number: "15+",
                label: "Countries",
                icon: <FaFlag className="text-3xl mb-4 mx-auto" />,
              },
              {
                number: "98%",
                label: "Client Satisfaction",
                icon: <FaHeart className="text-3xl mb-4 mx-auto" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                {stat.icon}
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Create Something Amazing Together?
          </motion.h2>
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's discuss how we can help you achieve your goals and bring your
            vision to life.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-all duration-300 shadow-lg flex items-center justify-center mx-auto sm:mx-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
            <motion.button
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300 shadow-lg flex items-center justify-center mx-auto sm:mx-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press"],
              },
              {
                title: "Products",
                links: ["Features", "Pricing", "Use Cases", "Testimonials"],
              },
              {
                title: "Resources",
                links: [
                  "Documentation",
                  "API Reference",
                  "Community",
                  "Support",
                ],
              },
              {
                title: "Connect",
                links: ["Twitter", "LinkedIn", "Facebook", "Instagram"],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-white text-lg font-bold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer> */}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
