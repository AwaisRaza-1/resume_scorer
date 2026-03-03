"use client";

import { motion } from "framer-motion";
import { CheckCircle, Tag, ListChecks } from "lucide-react";

export default function AnalysisPage() {
  const payload = {
    name: "Demo Resume.pdf",
    atsScore: 84,
    matchedKeywords: ["React", "JavaScript", "Frontend", "UI", "CSS"],
    missingKeywords: ["Next.js", "TypeScript", "Accessibility", "Testing"],
    feedback: [
      "Strong alignment with frontend frameworks and UI.",
      "Add Next.js experience to improve ATS matching.",
      "Include TypeScript usage and typical patterns.",
      "Mention automated tests and coverage improvements.",
    ],
  };

  return (
    <main className="min-h-screen">
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Results Analysis</h1>
              <p className="text-foreground/60">File: {payload.name}</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-primary">{payload.atsScore}%</span>
              <p className="text-xs uppercase font-bold text-foreground/40">ATS Score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-4">Feedback</h3>
              <div className="space-y-3">
                {payload.feedback.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.08 }}
                    className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-tight text-foreground/80">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" /> Keywords
              </h3>
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">Matched</p>
                <div className="flex flex-wrap gap-2">
                  {payload.matchedKeywords.map((k, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-secondary" /> Suggested
                </p>
                <div className="flex flex-wrap gap-2">
                  {payload.missingKeywords.map((k, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
