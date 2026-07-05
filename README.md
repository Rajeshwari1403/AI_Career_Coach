# AI Career Coach - Full-Stack SaaS Platform

AI Career Coach is a production-grade, full-stack SaaS application built to automate job-seeking workflows and accelerate professional growth. The platform features intelligent resume optimization, cover letter generation, localized market analysis, and mock interview simulation with interactive data visualization.

## 🚀 Key Features

* **AI Resume Builder:** Create and customize ATS-optimized resumes in Markdown format with real-time editing previews and direct PDF export.
* **AI Cover Letter Generator:** Automatically extract core technical requirements from any job description to generate highly tailored, professional cover letters.
* **Interactive Mock Interviews:** Simulates role-specific interview quiz engines powered by AI, delivering personalized scorecards, correct answer breakdowns, and automated improvement tips.
* **Weekly Market Insights Dashboard:** Pulls deep industry analytics like salary medians, demand forecasting, growth indicators, and skill maps updated dynamically over background worker loops.

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** Next.js (App Router & TurboPack), React 19, Tailwind CSS
* **UI Components:** Shadcn UI, Lucide React icons
* **Data Visualization:** Recharts (Dynamic performance tracking over time)
* **User Authentication:** Clerk Authentication Middleware
* **Database & ORM:** PostgreSQL (Neon DB Cloud Cluster), Prisma ORM
* **AI Engine:** Google Generative AI SDK (Gemini 2.5 Flash API)
* **Background Jobs:** Ingest Asynchronous Cron Engines (Weekly insights pipeline execution)
* **Form & Validation Management:** React Hook Form, Zod schema validation

## ⚙️ Getting Started

### Prerequisites
Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd ai-career-coach
