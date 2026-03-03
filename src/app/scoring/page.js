"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ScoringPage() {
  const router = useRouter();

  const payload = useMemo(() => {
    return {
      id: "demo",
      name: "Demo Resume.pdf",
      score: {
        overall: 84,
        metrics: { skillsAlignment: 92, experienceGap: 78 },
        feedback: [
          "Your React experience perfectly matches the role.",
          "Consider adding Next.js to your skills section.",
          "Quantify your results in the second experience entry.",
        ],
      },
    };
  }, []);

  const { name, score } = payload;
  const { overall, metrics, feedback } = score;

  return (
    <main className="min-h-screen">
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Score Result</h1>
              <p className="text-foreground/60">File: {name}</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-primary">{overall}%</span>
              <p className="text-xs uppercase font-bold text-foreground/40">Match Score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-border">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Skills Alignment</span>
                    <span className="text-primary">{metrics.skillsAlignment}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.skillsAlignment}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Experience Gap</span>
                    <span className="text-secondary">{metrics.experienceGap}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.experienceGap}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-secondary"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-bold mb-3">Key Feedback</h4>
                <div className="space-y-2">
                  {feedback.map((text, i) => (
                    <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-xs leading-tight text-foreground/80">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-4">Next Steps</h3>
              <ul className="text-foreground/70 space-y-2">
                <li>Update keywords and quantify achievements.</li>
                <li>Re-upload to see your new score immediately.</li>
                <li>Target a specific job description for alignment.</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <button onClick={() => router.push("/")} className="bg-primary text-white px-6 py-3 rounded-full font-semibold">
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
