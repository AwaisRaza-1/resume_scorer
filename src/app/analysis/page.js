"use client";

import { motion } from "framer-motion";
import { CheckCircle, Tag, ListChecks, ArrowLeft, Download, Share2, AlertCircle, Sparkles, Layout, Type, Move } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const [currentPayload, setCurrentPayload] = useState(null);

  useEffect(() => {
    // Try to get result from session storage
    const stored = sessionStorage.getItem("analysisResult");
    if (stored) {
      try {
        setCurrentPayload(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing stored analysis:", e);
      }
    }
  }, []);

  // Fallback to demo data if nothing is in session storage
  const demoPayload = {
    score: 85,
    details: {
      keywords: {
        score: 80,
        found: [
          "React.js",
          "Node.js",
          "JavaScript",
          "Frontend Development",
          "Backend Development",
          "API Integration"
        ],
        missing: [
          "HTML",
          "CSS",
          "Java",
          "C++"
        ],
        jd_match_percentage: 70
      },
      sections: {
        score: 90,
        present: [
          "EDUCATION",
          "TECHNICAL SKILLS",
          "WORK EXPERIENCE",
          "SOFT SKILLS",
          "PROJECTS"
        ],
        missing: [
          "CERTIFICATIONS",
          "ACHIEVEMENTS"
        ],
        notes: "Missing sections are acceptable for a junior role."
      },
      content_quality: {
        score: 85,
        strengths: [
          "Clear technical skills section",
          "Relevant work experience",
          "Impressive projects"
        ],
        improvements: [
          "Quantify achievements in work experience",
          "Expand on soft skills",
          "Use action verbs consistently"
        ]
      },
      recommendations: [
        "Add relevant certifications or courses to enhance credibility",
        "Include specific numbers and metrics to demonstrate impact in work experience",
        "Emphasize transferable skills and accomplishments in the profile section",
        "Consider adding a separate section for achievements or awards"
      ]
    },
    inferred_context: "Based on provided context",
    metadata: {
      remaining_requests: 6,
      filename: "MAwaisResume.pdf",
      timestamp: "2026-03-04T14:32:32.771219",
      ip: "127.0.0.1"
    }
  };

  const data = currentPayload;

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
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-foreground/60">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-20">
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
