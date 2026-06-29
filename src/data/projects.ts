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

// SVG path generator for architecture flow diagram
export function buildArchPath(steps: ArchStep[]): string {
  const BOX_H = 28;
  const GAP = 36;
  const totalH = steps.length * (BOX_H + GAP) - GAP;

  let svg = `<svg class="w-full" viewBox="0 0 320 ${totalH + 16}" xmlns="http://www.w3.org/2000/svg">\n`;
  svg += `  <defs>\n    <linearGradient id="flow-grad" x1="0" y1="0" x2="0" y2="1">\n      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>\n      <stop offset="100%" stop-color="#14b8a6" stop-opacity="0.2"/>\n    </linearGradient>\n  </defs>\n`;

  steps.forEach((step, i) => {
    const y = 8 + i * (BOX_H + GAP);
    if (i < steps.length - 1) {
      svg += `  <line x1="16" y1="${y + BOX_H}" x2="16" y2="${y + BOX_H + GAP}" stroke="#3b82f6" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="4 3"/>\n`;
    }
    svg += `  <circle cx="16" cy="${y + BOX_H / 2}" r="4" fill="#3b82f6" fill-opacity="0.8"/>\n`;
    svg += `  <rect x="30" y="${y}" width="280" height="${BOX_H}" rx="6" fill="url(#flow-grad)" stroke="#3b82f6" stroke-opacity="0.25" stroke-width="0.5"/>\n`;
    svg += `  <text x="40" y="${y + 11}" font-family="Geist, sans-serif" font-size="10" fill="#f4f4f5" font-weight="600">${step.label}</text>\n`;
    svg += `  <text x="40" y="${y + 22}" font-family="Geist, sans-serif" font-size="8" fill="#a1a1aa">${step.detail}</text>\n`;
  });

  svg += `</svg>`;
  return svg;
}
