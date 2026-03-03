"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Upload, Star } from "lucide-react";
import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function Hero() {
    const fileInputRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSelect = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setModalOpen(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        e.target.value = "";
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-primary uppercase bg-primary/10 rounded-full">
                                AI-Powered Career Success
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                                Get Your Resume <br />
                                <span className="text-gradient">Scored by AI</span>
                            </h1>
                            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto lg:mx-0">
                                Instantly analyze your resume against job descriptions, get a score back in seconds, and receive personalized tips to land your dream interview.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <button onClick={handleSelect} className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/25 group">
                                    Upload Resume <Upload className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                                </button>
                                <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-foreground border border-border px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all">
                                    See Example <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-foreground/60"><span className="font-bold text-foreground">10,000+</span> professionals use ScoreResume</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-10"
                        >
                            {/* Mockup UI */}
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-border max-w-lg mx-auto overflow-hidden">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center font-bold text-primary">JD</div>
                                        <div>
                                            <h3 className="font-bold text-sm">Senior Frontend Engineer</h3>
                                            <p className="text-xs text-foreground/50">Google • California, CA</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-primary">84%</span>
                                        <p className="text-[10px] uppercase font-bold text-foreground/40">Match Score</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                                            <span>Skills Alignment</span>
                                            <span className="text-primary">92%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "92%" }}
                                                transition={{ duration: 1, delay: 1 }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                                            <span>Experience Gap</span>
                                            <span className="text-secondary">78%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "78%" }}
                                                transition={{ duration: 1, delay: 1.2 }}
                                                className="h-full bg-secondary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h4 className="text-sm font-bold mb-3">Key Feedback</h4>
                                    <div className="space-y-2">
                                        {[
                                            "Your React experience perfectly matches the role.",
                                            "Consider adding 'Next.js' to your skills section.",
                                            "Quantify your results in the second experience entry."
                                        ].map((text, i) => (
                                            <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                                                <span className="text-xs leading-tight text-foreground/80">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-2xl -z-10 animate-float" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full -z-10 animate-pulse" />
                        </motion.div>
                    </div>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf"
                className="hidden"
                onChange={handleUpload}
            />
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Analyzing Your Resume"
                size="md"
                actions={
                    loading
                        ? [{ label: "Close", onClick: () => setModalOpen(false) }]
                        : [
                              { label: "Close", onClick: () => setModalOpen(false) },
                              { label: "View Analysis", onClick: () => router.push("/analysis"), variant: "primary" },
                          ]
                }
            >
                <div className="flex justify-center items-center gap-4">
                    <Loader visible={loading} text="Calculating ATS score" variant="inline" />
                </div>
                <div className="mt-6 space-y-3">
                    {["Parsing file", "Extracting keywords", "Computing ATS score", "Preparing feedback"].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.1 }}
                            className={`flex items-center justify-between p-3 rounded-xl border ${loading ? 'border-slate-100 bg-slate-50' : 'border-secondary/30 bg-secondary/5'}`}
                        >
                            <span className="text-sm font-medium">{item}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-foreground/60">{loading ? "In progress" : "Ready"}</span>
                                {!loading && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 300, 
                                            damping: 20,
                                            delay: i * 0.1 
                                        }}
                                    >
                                        <CheckCircle className="w-4 h-4 text-secondary" />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Modal>
        </section>
    );
}
