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
    title: "Feedback",
    items: [
      {
        slug: "button",
        name: "Button",
        blurb: "Solid, ghost, quiet. Three weights for any action.",
        built: true,
        glyph: "B",
      },
      {
        slug: "badge",
        name: "Badge",
        blurb: "Solid, outline, or dot with an optional live pulse.",
        built: true,
        glyph: "◆",
      },
      {
        slug: "progress",
        name: "Progress",
        blurb: "Accessible progressbar with a mono label and value.",
        built: true,
        glyph: "▮",
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        blurb: "Quiet placeholders while data streams in.",
        built: false,
        glyph: "▤",
      },
      {
        slug: "toast",
        name: "Toast",
        blurb: "Transient feedback, stacked and auto-dismissing.",
        built: false,
        glyph: "◌",
      },
    ],
  },
  {
    title: "Controls",
    items: [
      {
        slug: "input",
        name: "Input",
        blurb: "Labeled text field, keyboard-first and autofill-aware.",
        built: true,
        glyph: "⌨",
      },
      {
        slug: "toggle",
        name: "Toggle",
        blurb: "Switch with a visible checked state and focus ring.",
        built: true,
        glyph: "◉",
      },
      {
        slug: "tabs",
        name: "Tabs",
        blurb: "Tablist with an animated underline, pure keyboard.",
        built: true,
        glyph: "≣",
      },
    ],
  },
  {
    title: "Display",
    items: [
      {
        slug: "card",
        name: "Card",
        blurb: "A hairline-bordered surface for grouped content.",
        built: false,
        glyph: "▢",
      },
      {
        slug: "table",
        name: "Table",
        blurb: "Dense data rows with sticky headers and mono cells.",
        built: false,
        glyph: "▦",
      },
      {
        slug: "modal",
        name: "Modal",
        blurb: "Focus-trapped dialog with escape and backdrop.",
        built: false,
        glyph: "◻",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        blurb: "Hover and focus-triggered inline annotation.",
        built: false,
        glyph: "ⓘ",
      },
    ],
  },
];

export const ALL_COMPONENTS: ComponentMeta[] = COMPONENT_GROUPS.flatMap(
  (g) => g.items
);

export const BUILT_COUNT = ALL_COMPONENTS.filter((c) => c.built).length;
