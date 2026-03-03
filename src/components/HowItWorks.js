"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, Award } from "lucide-react";

const steps = [
    {
        icon: <Upload className="w-8 h-8" />,
        title: "Upload Your Resume",
        description: "Drop your PDF or Docx file into our secure uploader in seconds.",
    },
    {
        icon: <Cpu className="w-8 h-8" />,
        title: "AI Analysis",
        description: "Our advanced LLMs scan your experience against millions of data points.",
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: "Get Your Score",
        description: "Receive a detailed scorecard with actionable tips to improve your match.",
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full -z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-4">Three Simple Steps</h2>
                    <p className="text-foreground/60 text-lg">
                        Optimization shouldn't be complicated. We've streamlined the process to help you get results faster.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 text-center relative">
                            {/* Connector line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-slate-200 -z-10" />
                            )}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 border border-white"
                            >
                                <div className="text-primary italic font-black absolute -top-2 -right-2 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg">
                                    {index + 1}
                                </div>
                                <div className="text-primary">
                                    {step.icon}
                                </div>
                            </motion.div>

                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-foreground/60 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-navy hover:bg-black text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-navy/10">
                        Start Your Analysis Now
                    </button>
                </div>
            </div>
        </section>
    );
}
