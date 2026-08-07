/**
 * Per-component documentation for the detail pages at /components/[slug].
 * Usage snippets use the real public API of each primitive.
 */

export type PropDoc = {
  name: string;
  type: string;
  desc: string;
};

export type ComponentDoc = {
  usage: string;
  props: PropDoc[];
};

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  button: {
    usage: `import { Button } from "mero-ui";

<Button>Deploy</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="quiet" size="sm">Dismiss</Button>

<Button href="/pricing">Get started</Button>
<Button disabled>Waiting</Button>`,
    props: [
      { name: "variant", type: '"solid" | "ghost" | "quiet"', desc: "Visual weight. Defaults to solid." },
      { name: "size", type: '"sm" | "md" | "lg"', desc: "Button scale. Defaults to md." },
      { name: "href", type: "string", desc: "Renders an internal link instead of a button." },
      { name: "disabled", type: "boolean", desc: "Disables pointer events and dims the label." },
    ],
  },
  badge: {
    usage: `import { Badge } from "mero-ui";

<Badge>stable</Badge>
<Badge variant="outline">alpha</Badge>
<Badge variant="dot" pulse>v1.0.0</Badge>`,
    props: [
      { name: "variant", type: '"solid" | "outline" | "dot"', desc: "Filled, hairline, or dot status. Defaults to solid." },
      { name: "pulse", type: "boolean", desc: "Pulses the dot. Requires variant=\"dot\"." },
    ],
  },
  progress: {
    usage: `import { Progress } from "mero-ui";

<Progress value={72} label="Shipped" />`,
    props: [
      { name: "value", type: "number", desc: "Percentage, 0 to 100." },
      { name: "label", type: "string", desc: "Optional label rendered above the bar." },
    ],
  },
  skeleton: {
    usage: `import { Skeleton } from "mero-ui";

<Skeleton className="h-3 w-full" />
<Skeleton className="h-3 w-3/4" />`,
    props: [
      { name: "className", type: "string", desc: "Width, height and radius via Tailwind utilities." },
    ],
  },
  toast: {
    usage: `import { ToastProvider, ToastViewport, useToast } from "mero-ui";

function App() {
  return (
    <ToastProvider>
      <Notifier />
      <ToastViewport />
    </ToastProvider>
  );
}

function Notifier() {
  const { toast } = useToast();
  return (
    <Button onClick={() =>
      toast({ title: "Copied", description: "to the clipboard" })
    }>
      Notify
    </Button>
  );
}`,
    props: [
      { name: "toast", type: "fn({ title, description?, duration? })", desc: "Queues a toast. Returns its id." },
      { name: "dismiss", type: "fn(id: number)", desc: "Removes a toast by id." },
      { name: "duration", type: "number", desc: "Auto-dismiss delay in ms. Defaults to 4000." },
    ],
  },
  input: {
    usage: `import { Input } from "mero-ui";

<Input label="Email" placeholder="you@ship.dev" hint="We never share it." />`,
    props: [
      { name: "label", type: "string", desc: "Required visible label, rendered above the field." },
      { name: "placeholder", type: "string", desc: "Placeholder text inside the field." },
      { name: "hint", type: "string", desc: "Helper text rendered below the field." },
      { name: "id", type: "string", desc: "Custom field id. Derived from the label by default." },
    ],
  },
  toggle: {
    usage: `import { Toggle } from "mero-ui";

<Toggle label="Autoplay" defaultOn />
<Toggle label="Haptics" />`,
    props: [
      { name: "label", type: "string", desc: "Accessible label. Defaults to \"Toggle\"." },
      { name: "defaultOn", type: "boolean", desc: "Initial checked state. Defaults to false." },
    ],
  },
  tabs: {
    usage: `import { Tabs } from "mero-ui";

<Tabs
  items={[
    { label: "App", content: <p>Server by default.</p> },
    { label: "Page", content: <p>Streamed.</p> },
  ]}
/>`,
    props: [
      { name: "items", type: "{ label: string; content: ReactNode }[]", desc: "Tab labels and panel content." },
    ],
  },
  card: {
    usage: `import { Card, CardHeader, CardTitle, CardContent } from "mero-ui";

<Card>
  <CardHeader>
    <CardTitle>Ship it</CardTitle>
  </CardHeader>
  <CardContent>
    <p>One file at a time.</p>
  </CardContent>
</Card>`,
    props: [
      { name: "className", type: "string", desc: "Surface padding, width and layout utilities." },
    ],
  },
  table: {
    usage: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "mero-ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>name</TableHead>
      <TableHead>count</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell mono>button</TableCell>
      <TableCell mono>84</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    props: [
      { name: "mono", type: "boolean", desc: "TableCell renders its value in mono type." },
    ],
  },
  modal: {
    usage: `import { Modal } from "mero-ui";
import { useState } from "react";

function Dialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)}
        title="Dialog" description="Focus trapped.">
        <p>Escape and backdrop close it. Tab stays inside.</p>
      </Modal>
    </>
  );
}`,
    props: [
      { name: "open", type: "boolean", desc: "Controls visibility. Portaled to document.body." },
      { name: "onClose", type: "fn()", desc: "Called on Escape, backdrop, or close button." },
      { name: "title", type: "string", desc: "Dialog title, wired to aria-labelledby." },
      { name: "footer", type: "ReactNode", desc: "Optional action row at the bottom." },
    ],
  },
  tooltip: {
    usage: `import { Tooltip } from "mero-ui";

<Tooltip label="Copies the command" side="top">
  <Button variant="ghost">Copy</Button>
</Tooltip>`,
    props: [
      { name: "label", type: "string", desc: "Annotation text." },
      { name: "side", type: '"top" | "bottom" | "left" | "right"', desc: "Placement. Defaults to top." },
      { name: "delayMs", type: "number", desc: "Show delay in ms. Defaults to 150." },
    ],
  },
};
