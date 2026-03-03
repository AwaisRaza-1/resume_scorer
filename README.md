# ScoreResume AI - AI-Powered Resume Scoring

ScoreResume AI is a modern, AI-driven platform designed to help professionals optimize their resumes and land more interviews. By analyzing resumes against job descriptions, it provides a detailed ATS (Applicant Tracking System) score, identifies keyword gaps, and offers actionable feedback.

## 🚀 Key Features

- **Instant AI Scoring**: Get your resume analyzed and scored in seconds.
- **Detailed Results Analysis**: Comprehensive breakdown of formatting, content quality, and skill profile.
- **Skill Profile & Keyword Gaps**: Identify missing high-impact keywords that hiring managers and AI filters are looking for.
- **Immersive UX**: Smooth, animated loading states and interactive dashboards built with Framer Motion.
- **Reusable UI Components**: Clean and scalable architecture featuring custom Loaders and Modals.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useState, useRef)

## 📁 Project Structure

- `src/app/`: Next.js App Router pages and API routes.
  - `analysis/`: The immersive results analysis page.
- `src/components/`: Reusable UI components.
  - `Hero.js`: Interactive landing page header with file upload simulation.
  - `Loader.js`: Custom animated momentum loader.
  - `Modal.js`: Reusable modal component with custom sizing.
- `public/`: Static assets and icons.

## 🏁 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔍 How It Works

1. **Upload**: Users select their resume (PDF/DOCX) on the [Hero](file:///d:/My_Projects/resume_scoring/src/components/Hero.js) section.
2. **Analysis**: An immersive [Modal](file:///d:/My_Projects/resume_scoring/src/components/Modal.js) simulates the AI analysis process with real-time feedback.
3. **Report**: Upon completion, users can navigate to the [Analysis Page](file:///d:/My_Projects/resume_scoring/src/app/analysis/page.js) to view their detailed report.

---

Built with ❤️ for career growth.
