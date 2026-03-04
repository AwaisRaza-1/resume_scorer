"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Upload, Star, AlertCircle } from "lucide-react";
import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function Hero() {
    const fileInputRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [targetRole, setTargetRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setModalOpen(true);
        setError("");
        e.target.value = "";
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError("Please upload a resume first.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);
            if (targetRole) formData.append("target_role", targetRole);
            if (jobDescription) formData.append("job_description", jobDescription);

            const response = await fetch("http://localhost:8000/api/analyze", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail?.message || errorData.detail || "Failed to analyze resume.");
            }

            const data = await response.json();

            // Store result for the analysis page
            sessionStorage.setItem("analysisResult", JSON.stringify(data));

            // Brief delay to show complete states
            setTimeout(() => {
                setLoading(false);
                router.push("/analysis");
            }, 1000);

        } catch (err) {
            console.error("Analysis error:", err);
            setError(err.message || "An error occurred during analysis. Please try again.");
            setLoading(false);
        }
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
                onChange={handleFileChange}
            />
            <Modal
                open={modalOpen}
                onClose={() => !loading && setModalOpen(false)}
                title={loading ? "Analyzing Your Resume" : "Complete Your Analysis"}
                size="md"
                actions={
                    loading
                        ? []
                        : [
                            { label: "Cancel", onClick: () => setModalOpen(false) },
                            { label: "Start Analysis", onClick: handleAnalyze, variant: "primary" },
                        ]
                }
            >
                {loading ? (
                    <div className="py-4">
                        <div className="flex justify-center items-center gap-4 mb-8">
                            <Loader visible={loading} text="Analyzing with AI" variant="inline" />
                        </div>
                        <div className="space-y-3">
                            {["Parsing Documents", "Matching Keywords", "Calculating ATS Score", "Generating Feedback"].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.4 }}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                                >
                                    <span className="text-sm font-medium">{item}</span>
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> {error}
                            </div>
                        )}

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary font-bold">
                                PDF
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{file?.name || "No file selected"}</p>
                                <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-wider">{(file?.size / 1024).toFixed(1)} KB • Ready to upload</p>
                            </div>
                            <button onClick={handleSelect} className="text-xs font-bold text-primary hover:underline">Change</button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-foreground/40 tracking-widest ml-1">Target Role (Recommended)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Senior Frontend Engineer"
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-foreground/40 tracking-widest ml-1">Job Description (Optional)</label>
                                <textarea
                                    rows={5}
                                    placeholder="Paste the full job description for a more accurate ATS score..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-medium resize-none"
                                />
                            </div>
                        </div>

                        <p className="text-[10px] text-center text-foreground/40 font-medium px-6">
                            By clicking Start Analysis, your resume will be processed by our AI models to provide feedback and scoring.
                        </p>
                    </div>
                )}
            </Modal>
        </section>
    );
}
