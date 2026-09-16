"use client";

/**
 * Live component previews for the docs library index.
 * Every card renders the REAL component (no div-built fakes). Interactive
 * primitives (Modal, Toast, Tooltip) are wired to real triggers so the preview
 * is usable, not decorative.
 */
import PromptBar from "@/components/ui/PromptBar";
import Thinking from "@/components/ui/Thinking";
import RecommendationCard from "@/components/ui/RecommendationCard";
import { StreamText } from "@/components/ui/StreamText";
import { ImageGenesis } from "@/components/ui/ImageGenesis";
import { ToolProgress } from "@/components/ui/ToolProgress";
import Sidebar from "@/components/ui/Sidebar";

const DEMOS: Record<string, React.ReactNode> = {
  "prompt-bar": (
    <div className="w-full max-w-[560px]">
      <PromptBar />
    </div>
  ),
  "recommendation-card": (
    <div className="flex w-full max-w-[520px] items-center justify-center p-2">
      <RecommendationCard />
    </div>
  ),
  thinking: (
    <div className="flex w-full max-w-[520px] items-start justify-center">
      <Thinking variant="Steps" />
    </div>
  ),
  "stream-text": (
    <div className="w-full max-w-[560px] rounded-xl bg-white p-6 shadow-sm border border-zinc-100">
      <StreamText text="Hello, I am meroUI. I stream word by word, just like ChatGPT — the selective AI primitive library for chatbots and agents." speed={22} />
    </div>
  ),
  "image-genesis": (
    <div className="w-full max-w-[560px]">
      <ImageGenesis
        src="https://picsum.photos/seed/mero-genesis/900/560"
        alt="Genesis preview"
        prompt="A minimal studio with soft light — Gemini image-creating effect"
        loading={false}
      />
    </div>
  ),
  "tool-progress": (
    <div className="w-full max-w-[640px]">
      <ToolProgress
        steps={[
          { id: "1", label: "Searching", detail: "3 sources", status: "done" },
          { id: "2", label: "Reading", status: "active" },
          { id: "3", label: "Synthesizing", status: "pending" },
        ]}
      />
    </div>
  ),
  sidebar: (
    <div className="w-full max-w-[880px] overflow-hidden rounded-xl border border-line bg-surface">
      <Sidebar fill={false} className="h-[520px]" />
    </div>
  ),
};

export function ComponentPreview({ slug }: { slug: string }) {
  return <>{DEMOS[slug] ?? null}</>;
}