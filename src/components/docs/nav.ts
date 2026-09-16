// meroUI docs navigation data.
// Shared between the docs Sidebar and the library collection grid so the
// sidebar always mirrors what the page renders.

export const DOC_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "components", label: "Components" },
] as const;

export type ComponentMeta = {
  slug: string;
  name: string;
  blurb: string;
  /** true = source already ships in src/components/ui */
  built: boolean;
  /** shorthand shown inside the preview slot */
  glyph: string;
};

export const COMPONENT_GROUPS: { title: string; items: ComponentMeta[] }[] = [
  {
    title: "AI Core",
    items: [
      {
        slug: "recommendation-card",
        name: "Recommendation Card",
        blurb: "Holds shape, alternatives drawer, signal meter. Agent decision.",
        built: true,
        glyph: "⬔",
      },
      {
        slug: "thinking",
        name: "Thinking",
        blurb: "Expandable agent trace: Steps, Reasoning, Search, Coding. Four variants.",
        built: true,
        glyph: "◈",
      },
      {
        slug: "stream-text",
        name: "Stream Text",
        blurb: "Word-by-word reveal. Markdown-aware, caret.",
        built: true,
        glyph: "≋",
      },
      {
        slug: "image-genesis",
        name: "Image Genesis",
        blurb: "Shimmer + blur-up. Gemini image-creating effect.",
        built: true,
        glyph: "▣",
      },
      {
        slug: "tool-progress",
        name: "Tool Progress",
        blurb: "Searching → Reading → Synthesizing. Step bar.",
        built: true,
        glyph: "⬡",
      },
    ],
  },
  {
    title: "Composer",
    items: [
      {
        slug: "prompt-bar",
        name: "Prompt Bar",
        blurb: "Composer with @ sources, / commands, dictation and a model picker.",
        built: true,
        glyph: "✎",
      },
    ],
  },
  {
    title: "Shell — soon",
    items: [
      {
        slug: "sidebar",
        name: "Sidebar",
        blurb: "Collapsible threads, search, pinned. Shell primitive.",
        built: true,
        glyph: "▤",
      },
      {
        slug: "history",
        name: "History",
        blurb: "Grouped by time, keyboard nav, threads.",
        built: false,
        glyph: "◫",
      },
      {
        slug: "model-selector",
        name: "Model Selector",
        blurb: "Model picker with sweep. Inside Prompt Bar.",
        built: false,
        glyph: "◆",
      },
      {
        slug: "user-settings",
        name: "User Settings",
        blurb: "Profile, theme, shortcuts. Popover.",
        built: false,
        glyph: "⬢",
      },
    ],
  },
];

export const ALL_COMPONENTS: ComponentMeta[] = COMPONENT_GROUPS.flatMap(
  (g) => g.items
);

export const BUILT_COUNT = ALL_COMPONENTS.filter((c) => c.built).length;
