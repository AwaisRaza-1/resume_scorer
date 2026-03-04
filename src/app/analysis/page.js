"use client";

import { motion } from "framer-motion";
import { CheckCircle, Tag, ListChecks, ArrowLeft, Download, Share2, AlertCircle, Sparkles, Layout, Type, Move } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAnalysis } from "@/context/AnalysisContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const [currentPayload, setCurrentPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const { analysisInput, setAnalysisInput } = useAnalysis();
  const apiCalled = useRef(false);
  const router = useRouter();

  useEffect(() => {
    // If we have pending input from the hero modal
    if (analysisInput && !apiCalled.current) {
      performAnalysis(analysisInput);
      apiCalled.current = true;
    } else {
      // Otherwise try to get result from session storage (standard fallback)
      const stored = sessionStorage.getItem("analysisResult");
      if (stored) {
        try {
          setCurrentPayload(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing stored analysis:", e);
        }
      }
    }
  }, [analysisInput]);

  const performAnalysis = async (input) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", input.file);
      if (input.targetRole) formData.append("target_role", input.targetRole);
      if (input.jobDescription) formData.append("job_description", input.jobDescription);

      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.message || errorData.detail || "Failed to analyze resume.");
      }

      const data = await response.json();
      setCurrentPayload(data);
      sessionStorage.setItem("analysisResult", JSON.stringify(data));

      // Clear input context after successful fetch to prevent re-fetching on refresh
      setAnalysisInput(null);

    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const data = currentPayload;

  const handleShare = async () => {
    const shareData = {
      title: "My Resume Analysis Report",
      text: `I just got a score of ${data?.score}% on my resume! Check out the details.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  const handleExport = () => {
    if (!data) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 25;

    // --- Header & Brand ---
    doc.setFillColor(15, 23, 42); // Navy color from your theme
    doc.rect(0, 0, pageWidth, 45, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("ScoreResume Analysis", margin, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("AI-Powered Resume Optimization Report", margin, 28);
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 34);

    // --- Hero Section: Score ---
    yPos = 60;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Overall Resume Score", margin, yPos);

    yPos += 10;
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 25, 3, 3, "FD");

    doc.setTextColor(79, 70, 229); // Primary color
    doc.setFontSize(28);
    doc.text(`${data.score}%`, margin + 5, yPos + 17);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Filename: ${data.metadata?.filename || "Resume.pdf"}`, margin + 55, yPos + 10);
    doc.text(`JD Match: ${data.details.keywords.jd_match_percentage}%`, margin + 55, yPos + 17);

    // --- Categorical Scores ---
    yPos += 40;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Detailed Breakdown", margin, yPos);

    const tableData = [
      ["Keyword Alignment", `${data.details.keywords.score}%`],
      ["Content Quality", `${data.details.content_quality.score}%`],
      ["Section Completion", `${data.details.sections.score}%`]
    ];

    autoTable(doc, {
      startY: yPos + 5,
      head: [["Category", "Score"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      margin: { left: margin, right: margin }
    });

    yPos = doc.lastAutoTable.finalY + 15;

    // --- Keywords ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Skill & Keyword Matching", margin, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74); // Green
    doc.text("FOUND SKILLS:", margin, yPos);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const foundText = data.details.keywords.found.join(", ");
    const foundLines = doc.splitTextToSize(foundText, pageWidth - (margin * 2));
    doc.text(foundLines, margin, yPos + 6);
    yPos += 10 + (foundLines.length * 5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // Red
    doc.text("MISSING SKILLS:", margin, yPos);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const missingText = data.details.keywords.missing.join(", ");
    const missingLines = doc.splitTextToSize(missingText, pageWidth - (margin * 2));
    doc.text(missingLines, margin, yPos + 6);
    yPos += 10 + (missingLines.length * 5);

    // --- Strengths & Improvements ---
    if (yPos > 240) { doc.addPage(); yPos = 20; }

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Content Impact", margin, yPos);

    yPos += 10;
    autoTable(doc, {
      startY: yPos,
      head: [["High Impact Strengths", "Growth Opportunities"]],
      body: [
        [
          data.details.content_quality.strengths.join("\n\n"),
          data.details.content_quality.improvements.join("\n\n")
        ]
      ],
      theme: "grid",
      headStyles: { fillColor: [15, 23, 42] },
      styles: { fontSize: 9, cellPadding: 5 },
      margin: { left: margin, right: margin }
    });

    yPos = doc.lastAutoTable.finalY + 15;

    // --- Expert Recommendations ---
    if (yPos > 240) { doc.addPage(); yPos = 20; }

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Expert Recommendations", margin, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    data.details.recommendations.forEach((rec, i) => {
      const line = `• ${rec}`;
      const wrapped = doc.splitTextToSize(line, pageWidth - (margin * 2));
      doc.text(wrapped, margin, yPos);
      yPos += (wrapped.length * 5) + 2;
    });

    // --- Footer ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: "center" });
      doc.text("Powered by ScoreResume AI", pageWidth - margin, 285, { align: "right" });
    }

    doc.save(`Resume_Analysis_${data.metadata?.filename?.split(".")[0] || "Report"}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-6">
        <Loader visible={true} text="AI is analyzing your resume..." />
        <div className="mt-12 w-full max-w-md space-y-4">
          {["Scanning context", "Identifying key skills", "Calculating ATS compatibility", "Generating career advice"].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5 }}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <span className="text-sm font-medium text-slate-600">{text}</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">{error}</p>
        <Link
          href="/"
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
          Try Again
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-6">
          <Layout className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Analysis Found</h2>
        <p className="text-slate-500 mb-8">Please upload your resume to see results.</p>
        <Link
          href="/"
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
          Go to Upload
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-6">
            {data?.metadata?.remaining_requests !== undefined && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-primary" /> {data.metadata.remaining_requests} Scans Left
              </div>
            )}
            <div className="flex items-center gap-3 print:hidden">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-foreground/60 relative group"
                title="Share Report"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-secondary" /> : <Share2 className="w-4 h-4" />}
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    Link Copied!
                  </span>
                )}
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
              >
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-20 print:pt-0">
        <style jsx global>{`
          @media print {
            .glass { background: white !important; }
            .print\\:hidden { display: none !important; }
            body { background: white !important; }
            .container { max-width: 100% !important; padding: 0 !important; }
            .bg-slate-50\\/50 { background: white !important; }
            .bg-white { border: none !important; shadow: none !important; }
            .rounded-\\[2\\.5rem\\], .rounded-\\[2rem\\] { border-radius: 1rem !important; }
          }
        `}</style>
        <div className="container mx-auto px-6">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-white mb-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3" /> Analysis Complete
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-3">
                  Score: <span className="text-gradient">{data?.score}%</span>
                </h1>
                <p className="text-lg text-foreground/60 font-medium">
                  {data?.metadata?.filename || data?.name} • Analyzed on {new Date(data?.metadata?.timestamp || Date.now()).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 shadow-sm">
                    <span className="text-2xl font-black text-primary">A+</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">Grade</p>
                </div>
                <div className="h-16 w-px bg-slate-100 hidden md:block" />
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 shadow-sm">
                    <span className="text-2xl font-black text-secondary">{data?.details.keywords.jd_match_percentage}%</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">JD Match</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Keyword Analysis Section */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <Tag className="w-5 h-5 text-primary" /> Keyword Alignment
                  </h3>
                  <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-sm font-bold text-primary">
                    {data?.details.keywords.score}% Skill Score
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Keywords Found
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.details.keywords.found.map((k, i) => (
                        <span key={i} className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-50 text-foreground font-bold border border-slate-100 italic transition-colors">
                          &ldquo;{k}&rdquo;
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Missing Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.details.keywords.missing.map((k, i) => (
                        <span key={i} className="text-[11px] px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold border border-red-50 transition-colors">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm text-primary">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wider">Job Description Match</p>
                        <p className="text-[10px] text-foreground/50 font-medium">Percentage of keywords matching the targeted role</p>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-primary">
                      {data?.details.keywords.jd_match_percentage}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Quality */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-secondary" /> Content Impact
                  </h3>
                  <div className="text-right">
                    <span className="text-2xl font-black text-secondary">{data?.details.content_quality.score}%</span>
                    <p className="text-[10px] uppercase font-bold text-foreground/30">Quality Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-4 p-6 rounded-2xl bg-secondary/[0.02] border border-secondary/10">
                    <p className="text-xs font-black uppercase text-secondary tracking-widest">High Impact Areas</p>
                    <ul className="space-y-3">
                      {data?.details.content_quality.strengths.map((t, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                          <div className="w-1 h-1 rounded-full bg-secondary" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4 p-6 rounded-2xl bg-amber-500/[0.02] border border-amber-500/10">
                    <p className="text-xs font-black uppercase text-amber-600 tracking-widest">Growth Opportunities</p>
                    <ul className="space-y-3">
                      {data?.details.content_quality.improvements.map((t, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                          <div className="w-1 h-1 rounded-full bg-amber-500" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Keywords Card */}
              <div className="bg-navy rounded-[2rem] p-8 text-white shadow-2xl shadow-navy/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                  <Tag className="w-5 h-5 text-primary" /> Skill Profile
                </h3>

                <div className="space-y-8 relative z-10">
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-4">Detected Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {data?.details.keywords.found.map((k, i) => (
                        <span key={i} className="text-[11px] px-3 py-1.5 rounded-lg bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 transition-colors">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-4">Missing Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {data?.details.keywords.missing.map((k, i) => (
                        <span key={i} className="text-[11px] px-3 py-1.5 rounded-lg bg-primary/20 text-primary font-bold border border-primary/20 hover:bg-primary/30 transition-colors">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <ListChecks className="w-5 h-5 text-primary" /> Core Sections
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {data?.details.sections.present.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-foreground/70">
                        <CheckCircle className="w-3 h-3 text-secondary" /> {s}
                      </div>
                    ))}
                    {data?.details.sections.missing.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 text-[10px] font-bold text-amber-700">
                        <AlertCircle className="w-3 h-3" /> {s}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50/50 border border-dashed border-slate-200 mt-4">
                    <p className="text-xs text-foreground/50 italic leading-relaxed">
                      &ldquo;{data?.details.sections.notes}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20">
                <h3 className="text-xl font-bold mb-6">Expert Advice</h3>
                <div className="space-y-4">
                  {data?.details.recommendations.map((t, i) => (
                    <div key={i} className="flex gap-3 group">
                      <div className="w-1 h-1 rounded-full bg-white/40 mt-2 shrink-0 group-hover:bg-white transition-colors" />
                      <p className="text-sm font-medium leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">{t}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-2">Analysis Context</p>
                  <p className="text-xs font-medium opacity-80">{data?.inferred_context}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
