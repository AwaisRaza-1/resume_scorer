"use client";

import { motion } from "framer-motion";
import { Zap, Target, BarChart3, Shield, Users, Clock } from "lucide-react";

const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Instant ATS Check",
        description: "See how well your resume performs against Applicant Tracking Systems used by top companies.",
        color: "bg-blue-500/10",
        text: "text-blue-500"
    },
    {
        icon: <Target className="w-6 h-6" />,
        title: "Keyword Optimization",
        description: "Identify missing high-impact keywords that hiring managers and AI filters are looking for.",
        color: "bg-green-500/10",
        text: "text-green-500"
    },
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Visual Scorecard",
        description: "Get a comprehensive breakdown of your resume's impact, clarity, and skills alignment.",
        color: "bg-purple-500/10",
        text: "text-purple-500"
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Privacy Guaranteed",
        description: "Your data is encrypted and secure. We never share your personal information with third parties.",
        color: "bg-red-500/10",
        text: "text-red-500"
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Expert Guidance",
        description: "Tips and suggestions crafted by top recruitment specialists and AI algorithms.",
        color: "bg-amber-500/10",
        text: "text-amber-500"
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: "Real-time Feedback",
        description: "Make changes and re-score instantly to see how your improvements affect your outcome.",
        color: "bg-cyan-500/10",
        text: "text-cyan-500"
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-4">Precision Analysis Tools</h2>
                    <p className="text-foreground/60 text-lg">
                        Everything you need to optimize your resume and beat the bots. Our AI-driven platform provides deep insights that traditional scanners miss.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} ${feature.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-foreground/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
