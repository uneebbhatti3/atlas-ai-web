import type { Metadata } from "next";
import { IBM_Plex_Mono, Spectral } from "next/font/google";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  FileText,
  FolderKanban,
  Layers3,
  Upload,
  Workflow,
} from "lucide-react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PIPELINE = [
  { icon: FileText, label: "Documents" },
  { icon: Workflow, label: "Processing" },
  { icon: Database, label: "Vector index" },
  { icon: BrainCircuit, label: "Reasoning" },
] as const;

const FEATURES = [
  {
    ref: "A1",
    icon: FolderKanban,
    title: "Workspaces",
    desc: "Separate environments for the different areas of your work and knowledge.",
  },
  {
    ref: "A2",
    icon: Layers3,
    title: "Projects",
    desc: "Group related documents and research into a shared context.",
  },
  {
    ref: "A3",
    icon: FileText,
    title: "Documents",
    desc: "Write directly in Atlas, or bring in what you've already got.",
  },
  {
    ref: "B1",
    icon: Upload,
    title: "Ingestion",
    desc: "Raw files become structured, searchable knowledge automatically.",
  },
  {
    ref: "B2",
    icon: Database,
    title: "Vector index",
    desc: "Documents are chunked and embedded so meaning, not just keywords, is searchable.",
  },
  {
    ref: "B3",
    icon: BrainCircuit,
    title: "Retrieval & AI",
    desc: "Ask a question and get an answer grounded in your own material.",
  },
] as const;

const WORKFLOW = [
  {
    num: "01",
    icon: FileText,
    title: "Capture",
    desc: "Create a document or bring in existing knowledge.",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Process",
    desc: "Extract, clean, and split it for retrieval.",
  },
  {
    num: "03",
    icon: Database,
    title: "Index",
    desc: "Generate embeddings and store searchable knowledge.",
  },
  {
    num: "04",
    icon: BrainCircuit,
    title: "Reason",
    desc: "Retrieve what's relevant and generate an answer.",
  },
] as const;

const RETRIEVAL_STEPS = [
  { title: "Question", desc: "What are the important concepts in this project?" },
  { title: "Embedding", desc: "The query is transformed into a vector." },
  { title: "Retrieval", desc: "Semantically relevant chunks are found." },
  { title: "Context", desc: "A grounded context is assembled for the model." },
  { title: "Generation", desc: "An answer is produced, with sources." },
] as const;

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: { absolute: "Atlas AI — Your knowledge, connected to AI." },
  description:
    "Atlas AI is a personal engineering laboratory for capturing, organizing, and querying documents with retrieval-augmented generation. Build workspaces, manage projects, and ask questions across your entire knowledge base.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Atlas AI — Your knowledge, connected to AI.",
    description:
      "A personal knowledge workspace for organizing documents and exploring retrieval-augmented AI. Build your own knowledge system, one layer at a time.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas AI — personal knowledge workspace",
      },
    ],
  },
  twitter: {
    title: "Atlas AI — Your knowledge, connected to AI.",
    description:
      "A personal knowledge workspace for organizing documents and exploring retrieval-augmented AI. Build your own knowledge system, one layer at a time.",
    images: ["/twitter-image.png"],
  },
};

// ---------------------------------------------------------------------------
// Shared colour tokens (as Tailwind arbitrary values)
// These match the design palette and are inlined at usage sites below.
//   ink        #0E1D29   — page background
//   ink-2      #16293A   — card / panel background
//   paper      #EDE7D8   — primary text
//   muted      #9AACB8   — secondary text
//   brass      #B8863E   — accent
//   brass-hi   #CE9C54   — accent hover
//   signal     #7EA895   — icon accent
//   line       rgba(159,199,214,0.14)  — subtle border
//   line-str   rgba(159,199,214,0.28)  — stronger border / dashes
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Blueprint registration crosshair mark */
function RegMark({ className }: { className: string }) {
  return (
    <span className={`absolute h-3.5 w-3.5 ${className}`}>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-[rgba(159,199,214,0.28)]" />
      <span className="absolute bottom-0 left-1/2 top-0 w-px bg-[rgba(159,199,214,0.28)]" />
    </span>
  );
}

function RegMarks() {
  return (
    <>
      <RegMark className="left-3 top-3" />
      <RegMark className="right-3 top-3" />
      <RegMark className="bottom-3 left-3" />
      <RegMark className="bottom-3 right-3" />
    </>
  );
}

/** Eyebrow label with brass dot prefix */
function Eyebrow({
  children,
  animated = false,
}: {
  children: React.ReactNode;
  animated?: boolean;
}) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 mb-5.5",
        "[font-family:var(--font-plex-mono)] text-[11px] tracking-[0.18em] uppercase text-[#CE9C54]",
        animated ? "opacity-0 animate-[fadeUp_0.6s_ease-out_0.05s_forwards]" : "",
      ]
        .join(" ")
        .trim()}
    >
      <span className="h-1.25 w-1.25 rounded-full bg-[#B8863E]" />
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AtlasLanding() {
  return (
    <div
      className={`${plexMono.variable} ${spectral.variable} relative min-h-screen bg-[#0E1D29] text-[#EDE7D8]`}
    >
      {/* Background blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(159,199,214,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(159,199,214,0.14)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_75%_55%_at_50%_0%,black_30%,transparent_85%)]"
      />

      {/* ----------------------------------------------------------------- */}
      {/* Nav                                                                */}
      {/* ----------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-[rgba(159,199,214,0.14)] bg-[rgba(14,29,41,0.86)] backdrop-blur-[10px]">
        <div className="mx-auto flex h-16 max-w-280 items-center justify-between px-6">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-2.5 no-underline">
            <Image src={"/logo.png"} alt="Atlas AI" width={120} height={120} />
          </a>

          {/* Nav links — hidden on small screens */}
          <nav
            aria-label="Primary"
            className="hidden gap-0.5 [font-family:var(--font-plex-mono)] text-[12px] tracking-[0.04em] md:flex"
          >
            <a
              href="#features"
              className="rounded px-3 py-2 text-[#9AACB8] transition-colors duration-150 hover:bg-white/[0.04] hover:text-[#EDE7D8]"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="rounded px-3 py-2 text-[#9AACB8] transition-colors duration-150 hover:bg-white/[0.04] hover:text-[#EDE7D8]"
            >
              Architecture
            </a>
            <a
              href="#workflow"
              className="rounded px-3 py-2 text-[#9AACB8] transition-colors duration-150 hover:bg-white/[0.04] hover:text-[#EDE7D8]"
            >
              How it works
            </a>
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(159,199,214,0.28)] px-3.5 py-2 [font-family:var(--font-plex-mono)] text-xs text-[#EDE7D8] transition-all duration-150 hover:border-[#B8863E] hover:text-[#CE9C54]"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-[3px] border border-[#B8863E] bg-[#B8863E] px-3.5 py-2 [font-family:var(--font-plex-mono)] text-xs font-medium text-[#0E1D29] transition-all duration-150 hover:border-[#CE9C54] hover:bg-[#CE9C54]"
            >
              Open Atlas <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-[1]">
        {/* --------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-[1000px] px-6 pb-2 pt-[88px] text-center">
          <Eyebrow animated>Personal knowledge survey — vol. 01</Eyebrow>

          <h1 className="mb-[22px] [font-family:var(--font-spectral)] text-[42px] font-medium leading-[1.1] tracking-[-0.01em] opacity-0 [animation:fadeUp_0.6s_ease-out_0.12s_forwards] lg:text-[60px]">
            Chart what you know.
            <br />
            <i className="font-normal not-italic text-[#9AACB8]">Query what you find.</i>
          </h1>

          <p className="mx-auto mb-[34px] max-w-[540px] text-[17px] leading-[1.7] text-[#9AACB8] opacity-0 [animation:fadeUp_0.6s_ease-out_0.19s_forwards]">
            Atlas turns documents into searchable knowledge, then gives you a place to build
            retrieval, agents, and infrastructure on top of it — one layer at a time.
          </p>

          <div className="mb-16 flex flex-wrap justify-center gap-3.5 opacity-0 [animation:fadeUp_0.6s_ease-out_0.26s_forwards]">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-[3px] border border-[#B8863E] bg-[#B8863E] px-[18px] py-[11px] [font-family:var(--font-plex-mono)] text-[13px] font-medium text-[#0E1D29] transition-all duration-150 hover:border-[#CE9C54] hover:bg-[#CE9C54]"
            >
              Open a workspace <ArrowRight size={14} />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(159,199,214,0.28)] px-[18px] py-[11px] [font-family:var(--font-plex-mono)] text-[13px] text-[#EDE7D8] transition-all duration-150 hover:border-[#B8863E] hover:text-[#CE9C54]"
            >
              See how it works
            </a>
          </div>

          {/* Blueprint pipeline panel */}
          <div className="relative mx-auto max-w-[900px] rounded-[6px] border border-[rgba(159,199,214,0.28)] bg-gradient-to-b from-[#16293A] to-[#0E1D29] opacity-0 [animation:fadeUp_0.7s_ease-out_0.33s_forwards]">
            <RegMarks />

            <div className="px-11 pb-[30px] pt-[50px]">
              {/* Pipeline nodes */}
              <div className="flex items-start justify-between gap-1.5">
                {PIPELINE.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div key={node.label} className="contents">
                      <div className="flex w-[90px] shrink-0 flex-col items-center gap-2.5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(159,199,214,0.28)] bg-[#0E1D29] text-[#EDE7D8]">
                          <Icon size={17} />
                        </span>
                        <span className="text-center [font-family:var(--font-plex-mono)] text-[10.5px] uppercase tracking-[0.06em] text-[#9AACB8]">
                          {node.label}
                        </span>
                      </div>
                      {i < PIPELINE.length - 1 && (
                        <div className="mt-[22px] h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(159,199,214,0.28)_0,rgba(159,199,214,0.28)_6px,transparent_6px,transparent_12px)]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sheet title block */}
            <div className="flex flex-wrap gap-1.5 border-t border-[rgba(159,199,214,0.14)] px-10 py-[13px] [font-family:var(--font-plex-mono)] text-[11px] tracking-[0.04em] text-[#9AACB8]">
              <span className="mr-auto">FIG. 1 — KNOWLEDGE PIPELINE</span>
              <span>REV. A</span>
              <span>SCALE — N/A</span>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Intro                                                            */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-[1120px] border-b border-t border-[rgba(159,199,214,0.14)] px-6 py-[108px]">
          <div className="mx-auto max-w-[740px] border-l-2 border-[#B8863E] pl-[26px]">
            <p className="mb-[18px] [font-family:var(--font-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[#CE9C54]">
              Built to grow
            </p>
            <p className="[font-family:var(--font-spectral)] text-[21px] font-normal leading-[1.55] text-[#EDE7D8] lg:text-[27px]">
              Atlas starts small: a workspace, a project, a document. Everything underneath —{" "}
              <b className="font-medium italic text-[#CE9C54]">
                retrieval, agents, background workers, event pipelines, distributed infrastructure
              </b>{" "}
              — gets added as you learn to build it, not before.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Features                                                         */}
        {/* --------------------------------------------------------------- */}
        <section id="features" className="mx-auto max-w-[1120px] px-6 py-[104px]">
          <div className="mb-[52px] max-w-[620px]">
            <p className="mb-4 [font-family:var(--font-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[#CE9C54]">
              Index of capabilities
            </p>
            <h2 className="mb-3.5 [font-family:var(--font-spectral)] text-[26px] font-medium leading-[1.2] lg:text-[34px]">
              Everything starts with what you already know.
            </h2>
            <p className="text-[15.5px] leading-[1.7] text-[#9AACB8]">
              A structured foundation for storing, processing, retrieving, and eventually reasoning
              over your own information.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-px border border-[rgba(159,199,214,0.14)] bg-[rgba(159,199,214,0.14)] md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <li
                  key={f.ref}
                  className="bg-[#0E1D29] p-[30px_26px] transition-colors duration-200 hover:bg-[#16293A]"
                >
                  <span className="mb-[22px] block [font-family:var(--font-plex-mono)] text-[11px] tracking-[0.06em] text-[#B8863E]">
                    {f.ref}
                  </span>
                  <div className="mb-[18px] flex h-[34px] w-[34px] items-center justify-center rounded border border-[rgba(159,199,214,0.28)] text-[#7EA895]">
                    <Icon size={16} />
                  </div>
                  <h3 className="mb-2 [font-family:var(--font-spectral)] text-[18px] font-medium">
                    {f.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.65] text-[#9AACB8]">{f.desc}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Workflow                                                         */}
        {/* --------------------------------------------------------------- */}
        <section id="workflow" className="mx-auto max-w-[1120px] px-6 py-[104px]">
          <div className="mb-[52px] max-w-[620px]">
            <p className="mb-4 [font-family:var(--font-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[#CE9C54]">
              The process
            </p>
            <h2 className="mb-3.5 [font-family:var(--font-spectral)] text-[26px] font-medium leading-[1.2] lg:text-[34px]">
              From raw document to grounded answer.
            </h2>
            <p className="text-[15.5px] leading-[1.7] text-[#9AACB8]">
              The foundation is deliberately simple. The intelligence comes from the pipeline built
              on top of it.
            </p>
          </div>

          <ol className="flex flex-col gap-[30px] sm:flex-row sm:gap-3">
            {WORKFLOW.map((step, index) => {
              const isLast = index === WORKFLOW.length - 1;
              return (
                <li key={step.num} className="relative flex-1 sm:pr-[18px]">
                  {/* Dashed connector — hidden on mobile and on the last item */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="absolute left-7 right-0 top-[13px] hidden h-px bg-[repeating-linear-gradient(90deg,rgba(159,199,214,0.28)_0,rgba(159,199,214,0.28)_6px,transparent_6px,transparent_12px)] sm:block"
                    />
                  )}
                  <div className="relative z-[1] mb-[18px] flex h-7 w-7 items-center justify-center rounded-full border border-[#B8863E] bg-[#0E1D29] [font-family:var(--font-plex-mono)] text-xs text-[#CE9C54]">
                    {step.num}
                  </div>
                  <h3 className="mb-1.5 [font-family:var(--font-spectral)] text-[18px] font-medium">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.6] text-[#9AACB8]">{step.desc}</p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Architecture                                                     */}
        {/* --------------------------------------------------------------- */}
        <section id="architecture" className="mx-auto max-w-[1120px] px-6 py-[104px]">
          <div className="grid grid-cols-1 items-center gap-[40px] lg:grid-cols-2 lg:gap-[60px]">
            <div>
              <p className="mb-4 [font-family:var(--font-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[#CE9C54]">
                Under the surface
              </p>
              <h2 className="mb-4 [font-family:var(--font-spectral)] text-[26px] font-medium leading-[1.25] lg:text-[32px]">
                Not a chatbot bolted onto search.
                <br />
                <i className="font-normal text-[#9AACB8]">A pipeline you can see.</i>
              </h2>
              <p className="mb-[26px] max-w-[460px] text-[15px] leading-[1.7] text-[#9AACB8]">
                Every answer in Atlas can be traced back through the system that produced it —
                embedding, retrieval, context, generation. As agents and background infrastructure
                get added, they extend this same pipeline instead of replacing it.
              </p>
              <a
                href="/signup"
                className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(159,199,214,0.28)] px-[18px] py-[11px] [font-family:var(--font-plex-mono)] text-[13px] text-[#EDE7D8] transition-all duration-150 hover:border-[#B8863E] hover:text-[#CE9C54]"
              >
                Explore the architecture <ArrowRight size={14} />
              </a>
            </div>

            {/* Retrieval pipeline panel */}
            <div className="overflow-hidden rounded-[6px] border border-[rgba(159,199,214,0.28)] bg-[#16293A]">
              <div className="border-b border-[rgba(159,199,214,0.14)] px-5 py-[15px] [font-family:var(--font-plex-mono)] text-[10.5px] uppercase tracking-[0.08em] text-[#9AACB8]">
                Retrieval pipeline — how a query moves
              </div>
              {RETRIEVAL_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="flex items-start gap-3.5 border-b border-[rgba(159,199,214,0.14)] px-5 py-[15px] last:border-b-0"
                >
                  <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded bg-[#B8863E] [font-family:var(--font-plex-mono)] text-[11px] text-[#0E1D29]">
                    {i + 1}
                  </span>
                  <div>
                    <div className="mb-0.5 text-[13px] font-semibold text-[#EDE7D8]">
                      {step.title}
                    </div>
                    <div className="text-[12.5px] leading-[1.5] text-[#9AACB8]">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* CTA                                                              */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-[1120px] px-6 pb-[110px] pt-10">
          <div className="relative rounded-[6px] border border-[rgba(159,199,214,0.28)] bg-gradient-to-b from-[#16293A] to-[#0E1D29]">
            <RegMarks />
            <div className="px-[22px] py-10 text-center sm:px-10 sm:py-[60px]">
              <Eyebrow>Start here</Eyebrow>
              <h2 className="mx-auto mb-3.5 mt-4 max-w-[520px] [font-family:var(--font-spectral)] text-[26px] font-medium leading-[1.25] lg:text-[32px]">
                Build the system one layer at a time.
              </h2>
              <p className="mx-auto mb-[30px] max-w-[460px] text-[15px] leading-[1.7] text-[#9AACB8]">
                Open a workspace, add a document, and ask your first question. Retrieval, agents,
                and infrastructure get added when you&apos;re ready for them.
              </p>
              <a
                href="/signup"
                className="inline-flex items-center gap-2 rounded-[3px] border border-[#B8863E] bg-[#B8863E] px-[18px] py-[11px] [font-family:var(--font-plex-mono)] text-[13px] font-medium text-[#0E1D29] transition-all duration-150 hover:border-[#CE9C54] hover:bg-[#CE9C54]"
              >
                Create your first workspace <ArrowRight size={14} />
              </a>
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-[rgba(159,199,214,0.14)] px-10 py-[13px] [font-family:var(--font-plex-mono)] text-[11px] tracking-[0.04em] text-[#9AACB8]">
              <span className="mr-auto">FIG. 2 — GETTING STARTED</span>
              <span>REV. A</span>
              <span>SCALE — N/A</span>
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- */}
      {/* Footer                                                             */}
      {/* ----------------------------------------------------------------- */}
      <footer className="relative z-[1] border-t border-[rgba(159,199,214,0.14)]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-3.5 px-6 py-[26px] [font-family:var(--font-plex-mono)] text-[11px] uppercase tracking-[0.06em] text-[#9AACB8]">
          <div className="flex flex-wrap gap-6">
            <span>
              PROJECT{" "}
              <span className="ml-1.5 normal-case tracking-normal text-[#EDE7D8]">Atlas AI</span>
            </span>
            <span>
              SHEET{" "}
              <span className="ml-1.5 normal-case tracking-normal text-[#EDE7D8]">01 OF ∞</span>
            </span>
            <span>
              REV <span className="ml-1.5 normal-case tracking-normal text-[#EDE7D8]">A</span>
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-[#CE9C54]"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
