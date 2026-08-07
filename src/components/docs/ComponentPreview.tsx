"use client";

/**
 * Live component previews for the docs library index.
 * Every card renders the REAL component (no div-built fakes). Interactive
 * primitives (Modal, Toast, Tooltip) are wired to real triggers so the preview
 * is usable, not decorative.
 */
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { ToastProvider, ToastViewport, useToast } from "@/components/ui/Toast";
import { Tooltip } from "@/components/ui/Tooltip";
import { Modal } from "@/components/ui/Modal";

function ToastDemo() {
  const { toast } = useToast();
  return (
    <>
      <Button
        size="sm"
        onClick={() =>
          toast({ title: "Component added", description: "copied to src/components/ui" })
        }
      >
        Notify
      </Button>
      <ToastViewport />
    </>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Dialog"
        description="A focus-trapped surface."
      >
        <p className="text-sm leading-6 text-zinc-400">
          Escape closes it, the backdrop closes it, Tab stays inside, and focus
          returns to the trigger when it closes.
        </p>
      </Modal>
    </>
  );
}

const DEMOS: Record<string, React.ReactNode> = {
  button: (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="sm">Deploy</Button>
      <Button size="sm" variant="ghost">
        Cancel
      </Button>
    </div>
  ),
  badge: (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="dot" pulse>
        v1.0.0
      </Badge>
      <Badge>stable</Badge>
    </div>
  ),
  progress: (
    <div className="w-full max-w-[11rem]">
      <Progress value={72} label="Shipped" />
    </div>
  ),
  toggle: (
    <div className="flex flex-col items-center gap-3">
      <Toggle defaultOn label="Autoplay" />
      <Toggle label="Haptics" />
    </div>
  ),
  input: (
    <div className="w-full max-w-[11rem]">
      <Input label="Email" placeholder="you@ship.dev" />
    </div>
  ),
  tabs: (
    <Tabs
      items={[
        {
          label: "App",
          content: (
            <span className="font-mono text-[10px] text-zinc-400">rsc by default</span>
          ),
        },
        {
          label: "Page",
          content: (
            <span className="font-mono text-[10px] text-zinc-400">streamed</span>
          ),
        },
        {
          label: "Data",
          content: (
            <span className="font-mono text-[10px] text-zinc-400">server action</span>
          ),
        },
      ]}
    />
  ),
  card: (
    <Card className="w-full max-w-[12rem]">
      <CardHeader>
        <CardTitle>Ship it</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs leading-5 text-zinc-400">One file at a time.</p>
      </CardContent>
    </Card>
  ),
  skeleton: (
    <div className="w-24 flex flex-col gap-2">
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-2 w-3/4" />
      <Skeleton className="h-2 w-1/2" />
    </div>
  ),
  table: (
    <Table className="max-w-[12rem]">
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
        <TableRow>
          <TableCell mono>modal</TableCell>
          <TableCell mono>3</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  tooltip: (
    <Tooltip label="hover + focus" side="top">
      <Button size="sm" variant="ghost">
        Tip
      </Button>
    </Tooltip>
  ),
  modal: (
    <div className="flex items-center justify-center">
      <ModalDemo />
    </div>
  ),
  toast: (
    <ToastProvider>
      <div className="flex items-center justify-center">
        <ToastDemo />
      </div>
    </ToastProvider>
  ),
};

export function ComponentPreview({ slug }: { slug: string }) {
  return <>{DEMOS[slug] ?? null}</>;
}