export interface ProjectMetric {
  label: string;
  value: string;
  gradient: "blue" | "teal" | "indigo";
}

export interface ArchStep {
  label: string;
  detail: string;
}

export interface ProjectData {
  title: string;
  year: string;
  subtitle: string;
  metrics: ProjectMetric[];
  archFlow: ArchStep[];
  techBadges: string[];
  githubUrl: string;
}

export const projects: ProjectData[] = [
  {
    title: "DocSage",
    year: "2026",
    subtitle: "Vietnamese Document RAG Assistant",
    metrics: [
      { label: "Hybrid Retrieval", value: "60% vec + 40% BM25", gradient: "blue" },
      { label: "Multi-LLM", value: "Ollama + OpenRouter", gradient: "teal" },
      { label: "Deployment", value: "Docker-ready", gradient: "indigo" },
    ],
    archFlow: [
      { label: "Upload PDF/Image", detail: "entry point via app.py" },
      { label: "Document Parsing", detail: "Azure Document Intelligence + PyPDF fallback" },
      { label: "Semantic Chunking", detail: "LangChain SemanticChunker" },
      { label: "Vector + BM25 Index", detail: "ChromaDB vector + BM25 keyword" },
      { label: "Query Expansion", detail: "RePhrase + HyDE hypothesis generation" },
      { label: "Hybrid Retrieval", detail: "process_pdf_to_retriever -> Chroma + BM25" },
      { label: "LLM Answer", detail: "Multi-LLM Factory: Ollama Qwen 3.5 + OpenRouter" },
    ],
    techBadges: ["LangChain", "Azure DI", "bkai-bi-encoder", "Ollama", "OpenRouter", "ChromaDB", "Docker"],
    githubUrl: "https://github.com/KunN-21/DocSage",
  },
  {
    title: "Traffic Congestion Warning",
    year: "2025",
    subtitle: "Real-time detection from video feeds",
    metrics: [
      { label: "Detection Accuracy", value: "86.3% mAP@50", gradient: "blue" },
      { label: "Real-time", value: "30+ FPS", gradient: "teal" },
      { label: "Tracking", value: "BoT-SORT + ReID", gradient: "indigo" },
    ],
    archFlow: [
      { label: "Video Feed", detail: "multi-threaded video pipeline" },
      { label: "YOLOv11 Detection", detail: "custom-trained on Vietnamese vehicle dataset" },
      { label: "BoT-SORT Tracking", detail: "multi-object tracking with ReID" },
      { label: "Density Calculation", detail: "formula based on Vietnamese vehicle area standards" },
      { label: "Alert + UI", detail: "PyQt6 desktop app with real-time charts" },
    ],
    techBadges: ["YOLOv11", "PyQt6", "BoT-SORT", "OpenCV", "PyTorch", "NumPy"],
    githubUrl: "https://github.com/KunN-21/Traffic-Congestion-Warning-System",
  },
];

// SVG path generator for architecture flow diagram.
// Theme-aware via .arch-flow CSS vars (defined in global.css).
export function buildArchPath(steps: ArchStep[]): string {
  const BOX_H = 22;
  const GAP = 18;
  const totalH = steps.length * (BOX_H + GAP) - GAP;

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let svg = `<svg class="w-full arch-flow" viewBox="0 0 320 ${totalH + 8}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture flow diagram">\n`;
  svg += `<style>
    .arch-flow .stroke { stroke: var(--arch-stroke); }
    .arch-flow .stroke-soft { stroke: var(--arch-stroke-soft); }
    .arch-flow .node { fill: var(--arch-stroke); fill-opacity: 0.85; }
    .arch-flow .box { fill: url(#flow-grad); stroke: var(--arch-stroke); stroke-opacity: 0.30; stroke-width: 0.5; }
    .arch-flow .label { fill: var(--arch-label); font: 600 9px Geist, ui-sans-serif, sans-serif; }
    .arch-flow .detail { fill: var(--arch-detail); font: 7px Geist, ui-sans-serif, sans-serif; }
    .arch-flow g.step { opacity: 0; animation: arch-step-in 0.4s ease-out forwards; }
    @keyframes arch-step-in { to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .arch-flow g.step { opacity: 1; animation: none; }
    }
  </style>\n`;
  svg += `<defs>
    <linearGradient id="flow-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--arch-fill-from)"/>
      <stop offset="100%" stop-color="var(--arch-fill-to)"/>
    </linearGradient>
  </defs>\n`;

  steps.forEach((step, i) => {
    const y = 4 + i * (BOX_H + GAP);
    const delay = `${i * 80}ms`;
    svg += `<g class="step" style="animation-delay:${delay}">\n`;
    if (i < steps.length - 1) {
      svg += `<line class="stroke-soft" x1="14" y1="${y + BOX_H}" x2="14" y2="${y + BOX_H + GAP}" stroke-width="1.5" stroke-dasharray="3 2"/>\n`;
    }
    svg += `<circle class="node" cx="14" cy="${y + BOX_H / 2}" r="3"/>\n`;
    svg += `<rect class="box" x="26" y="${y}" width="284" height="${BOX_H}" rx="5"/>\n`;
    svg += `<text class="label" x="34" y="${y + 9}">${escape(step.label)}</text>\n`;
    svg += `<text class="detail" x="34" y="${y + 18}">${escape(step.detail)}</text>\n`;
    svg += `</g>\n`;
  });

  svg += `</svg>`;
  return svg;
}
