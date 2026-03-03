"use client";

import { motion } from "framer-motion";
import { CheckCircle, Tag, ListChecks, ArrowLeft, Download, Share2, AlertCircle, Sparkles, Layout, Type, Move } from "lucide-react";
import Link from "next/link";

export default function AnalysisPage() {
  const payload = {
    score: 86,
    details: {
      formatting: {
        score: 88,
        visual_assessment: {
          layout:
            "The layout is clean and well-organized with clear section breaks and consistent heading styles.",
          typography:
            "Typography is consistent throughout, using a single, readable font with appropriate bolding for emphasis and hierarchy.",
          spacing:
            "Spacing is generally good, providing sufficient white space between sections and list items, though some sub-bullets could use slightly more indentation.",
          ats_compatibility:
            "The resume is highly ATS-friendly due to its standard text-based format, clear headings, and simple bullet points.",
        },
        strengths: [
          "Clear and consistent section headings (all caps, bold).",
          "Effective use of bullet points for readability and conciseness.",
          "Clean, professional layout with good overall white space.",
        ],
        issues: [
          "Inconsistent use of parenthetical notes (e.g., '(Proficient)', '(Learning)') within skill lists.",
          "Slightly inconsistent bolding within project titles (e.g., 'Deployed' is bolded in parentheses).",
          "Consider standardizing bullet types for all list items to ensure maximum ATS parsing reliability.",
        ],
      },
      keywords: {
        score: 80,
        found: [
          "Machine Learning",
          "Python",
          "TensorFlow",
          "Scikit-learn",
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Deep Learning",
        ],
        missing: [
          "Natural Language Processing",
          "Computer Vision",
          "Reinforcement Learning",
        ],
        jd_match_percentage: null,
      },
      sections: {
        score: 90,
        present: [
          "PROFESSIONAL SUMMARY",
          "EDUCATION",
          "TECHNICAL SKILLS",
          "AI/ML PROJECTS",
          "ADDITIONAL QUALIFICATIONS",
        ],
        missing: ["WORK EXPERIENCE", "CERTIFICATIONS"],
        notes: "Missing sections are acceptable for an internship role.",
      },
      content_quality: {
        score: 85,
        strengths: [
          "Clear project descriptions",
          "Relevant technical skills",
          "Strong educational background",
        ],
        improvements: [
          "Quantify achievements with metrics",
          "Provide more context for projects",
          "Emphasize transferable skills",
        ],
      },
      recommendations: [
        "Add relevant coursework or academic projects to demonstrate expertise",
        "Include metrics or statistics to measure project success",
        "Highlight soft skills, such as communication or teamwork, in addition to technical skills",
      ],
    },
    inferred_context: "Based on provided context",
    name: "Demo Resume.pdf",
  };

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
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-foreground/60">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
              <Download className="w-4 h-4" /> Export Report
            </button>
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
                  Score: <span className="text-gradient">{payload.score}%</span>
                </h1>
                <p className="text-lg text-foreground/60 font-medium">
                  {payload.name} • Analyzed on {new Date().toLocaleDateString()}
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
                    <span className="text-2xl font-black text-secondary">88</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">Parsing</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Formatting Grid */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <Layout className="w-5 h-5 text-primary" /> Visual & Formatting
                  </h3>
                  <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-sm font-bold text-primary">
                    {payload.details.formatting.score}% Match
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {Object.entries(payload.details.formatting.visual_assessment).map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-primary/20 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white shadow-sm text-primary group-hover:scale-110 transition-transform">
                          {k === 'layout' && <Layout className="w-4 h-4" />}
                          {k === 'typography' && <Type className="w-4 h-4" />}
                          {k === 'spacing' && <Move className="w-4 h-4" />}
                          {k === 'ats_compatibility' && <CheckCircle className="w-4 h-4" />}
                        </div>
                        <p className="text-[10px] uppercase font-black text-foreground/40 tracking-widest">
                          {k.replace("_", " ")}
                        </p>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed font-medium">{v}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-50">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Key Strengths
                    </h4>
                    {payload.details.formatting.strengths.map((t, i) => (
                      <div key={i} className="flex gap-3 items-start group">
                        <div className="mt-1 p-0.5 rounded-full bg-secondary/10 text-secondary">
                          <CheckCircle className="w-3 h-3" />
                        </div>
                        <span className="text-xs text-foreground/60 group-hover:text-foreground transition-colors leading-normal">{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Improvement Areas
                    </h4>
                    {payload.details.formatting.issues.map((t, i) => (
                      <div key={i} className="flex gap-3 items-start group">
                        <div className="mt-1 p-0.5 rounded-full bg-amber-500/10 text-amber-500">
                          <AlertCircle className="w-3 h-3" />
                        </div>
                        <span className="text-xs text-foreground/60 group-hover:text-foreground transition-colors leading-normal">{t}</span>
                      </div>
                    ))}
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
                    <span className="text-2xl font-black text-secondary">{payload.details.content_quality.score}%</span>
                    <p className="text-[10px] uppercase font-bold text-foreground/30">Quality Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-4 p-6 rounded-2xl bg-secondary/[0.02] border border-secondary/10">
                    <p className="text-xs font-black uppercase text-secondary tracking-widest">High Impact Areas</p>
                    <ul className="space-y-3">
                      {payload.details.content_quality.strengths.map((t, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                          <div className="w-1 h-1 rounded-full bg-secondary" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4 p-6 rounded-2xl bg-amber-500/[0.02] border border-amber-500/10">
                    <p className="text-xs font-black uppercase text-amber-600 tracking-widest">Growth Opportunities</p>
                    <ul className="space-y-3">
                      {payload.details.content_quality.improvements.map((t, i) => (
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
                      {payload.details.keywords.found.map((k, i) => (
                        <span key={i} className="text-[11px] px-3 py-1.5 rounded-lg bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 transition-colors">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-4">Missing Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {payload.details.keywords.missing.map((k, i) => (
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
                    {payload.details.sections.present.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-foreground/70">
                        <CheckCircle className="w-3 h-3 text-secondary" /> {s}
                      </div>
                    ))}
                    {payload.details.sections.missing.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 text-[10px] font-bold text-amber-700">
                        <AlertCircle className="w-3 h-3" /> {s}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50/50 border border-dashed border-slate-200 mt-4">
                    <p className="text-xs text-foreground/50 italic leading-relaxed">
                      &ldquo;{payload.details.sections.notes}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20">
                <h3 className="text-xl font-bold mb-6">Expert Advice</h3>
                <div className="space-y-4">
                  {payload.details.recommendations.map((t, i) => (
                    <div key={i} className="flex gap-3 group">
                      <div className="w-1 h-1 rounded-full bg-white/40 mt-2 shrink-0 group-hover:bg-white transition-colors" />
                      <p className="text-sm font-medium leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">{t}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-2">Analysis Context</p>
                  <p className="text-xs font-medium opacity-80">{payload.inferred_context}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
