"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "How accurate is the AI scoring?",
        answer: "Our AI is trained on over 5 million resumes and job descriptions. It matches the accuracy of human recruiters with 95% consistency, while providing more detailed objective analysis."
    },
    {
        question: "Does it support PDF and Word documents?",
        answer: "Yes, we support .pdf, .docx, and .doc formats. We recommend PDF for the most accurate formatting analysis."
    },
    {
        question: "Is my personal data safe?",
        answer: "Absolutely. We use bank-level encryption. Your resume is processed securely and is never shared or sold. You can delete your data at any time."
    },
    {
        question: "Can I use it for free?",
        answer: "Yes! We offer a free tier that allows you to score one resume per day. Our premium plans offer unlimited scans and advanced keyword suggestions."
    },
    {
        question: "How long does the analysis take?",
        answer: "Typically, you'll receive your scorecard and feedback in less than 30 seconds."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-foreground/60 text-lg">
                        Everything you need to know about ScoreResume.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left font-bold text-lg"
                            >
                                {faq.question}
                                {openIndex === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-foreground/40" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-foreground/70 leading-relaxed border-t border-slate-50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
