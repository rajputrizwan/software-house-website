"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Smartphone, Cloud, Palette } from "lucide-react";

const services = [
    {
        title: "Web Development",
        icon: Code,
        description:
            "Fast, scalable, and SEO-friendly web applications built with the latest technologies.",
        image: "/images/web-dev.svg",
    },
    {
        title: "Mobile Apps",
        icon: Smartphone,
        description:
            "Cross-platform mobile apps with sleek UI and smooth performance.",
        image: "/images/mobile-app.svg",
    },
    {
        title: "Cloud Solutions",
        icon: Cloud,
        description:
            "Secure, scalable, and cost-efficient cloud services for modern businesses.",
        image: "/images/cloud.svg",
    },
    {
        title: "UI/UX Design",
        icon: Palette,
        description:
            "Visually appealing, user-centric, and accessible designs to elevate your brand.",
        image: "/images/design.svg",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function ServicesPage() {
    return (
        <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Hero Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Discover how we can help transform your digital presence with innovative,
                        scalable, and customer-focused solutions.
                    </p>
                    <Button size="lg">Book a Free Consultation</Button>
                </motion.div>

                {/* Services List */}
                <div className="flex flex-col gap-20">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                            variants={fadeUp}
                            className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Illustration */}
                            <div className="flex justify-center">
                                <motion.img
                                    src={service.image}
                                    alt={service.title}
                                    className="max-w-sm w-full"
                                    whileHover={{ scale: 1.05 }}
                                />
                            </div>

                            {/* Text */}
                            <Card className="shadow-md border rounded-2xl">
                                <CardContent className="p-8 text-center md:text-left">
                                    <div className="flex justify-center md:justify-start mb-4">
                                        <service.icon className="w-10 h-10 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-3">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <Button variant="outline">Learn More</Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}



// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Code, Smartphone, Cloud, Palette } from "lucide-react";

// const services = [
//     {
//         id: "web",
//         title: "Web Development",
//         icon: <Code className="w-6 h-6" />,
//         description:
//             "We build fast, scalable, and SEO-friendly web applications tailored to your business needs.",
//     },
//     {
//         id: "mobile",
//         title: "Mobile Apps",
//         icon: <Smartphone className="w-6 h-6" />,
//         description:
//             "Cross-platform mobile applications with sleek UI and seamless performance.",
//     },
//     {
//         id: "cloud",
//         title: "Cloud Solutions",
//         icon: <Cloud className="w-6 h-6" />,
//         description:
//             "Secure, scalable, and cost-efficient cloud services to power your digital infrastructure.",
//     },
//     {
//         id: "design",
//         title: "UI/UX Design",
//         icon: <Palette className="w-6 h-6" />,
//         description:
//             "User-centric, visually appealing, and accessible design that elevates your brand.",
//     },
// ];

// export default function ServicesTabs() {
//     const [activeTab, setActiveTab] = useState("web");

//     return (
//         <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
//             <div className="max-w-5xl mx-auto px-4 text-center">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Services</h2>

//                 <Tabs
//                     value={activeTab}
//                     onValueChange={(val) => setActiveTab(val)}
//                     className="w-full"
//                 >
//                     <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
//                         {services.map((service) => (
//                             <TabsTrigger
//                                 key={service.id}
//                                 value={service.id}
//                                 className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm md:text-base data-[state=active]:bg-black data-[state=active]:text-white"
//                             >
//                                 {service.icon}
//                                 {service.title}
//                             </TabsTrigger>
//                         ))}
//                     </TabsList>

//                     {services.map((service) => (
//                         <TabsContent key={service.id} value={service.id}>
//                             <AnimatePresence mode="wait">
//                                 {activeTab === service.id && (
//                                     <motion.div
//                                         key={service.id}
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, y: -20 }}
//                                         transition={{ duration: 0.4 }}
//                                     >
//                                         <Card className="shadow-lg border rounded-2xl max-w-2xl mx-auto">
//                                             <CardContent className="p-6">
//                                                 <div className="flex flex-col items-center gap-4">
//                                                     <div className="p-4 bg-gray-100 rounded-full">{service.icon}</div>
//                                                     <h3 className="text-xl font-semibold">{service.title}</h3>
//                                                     <p className="text-gray-600 text-base md:text-lg max-w-lg">
//                                                         {service.description}
//                                                     </p>
//                                                 </div>
//                                             </CardContent>
//                                         </Card>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </TabsContent>
//                     ))}
//                 </Tabs>
//             </div>
//         </section>
//     );
// }
