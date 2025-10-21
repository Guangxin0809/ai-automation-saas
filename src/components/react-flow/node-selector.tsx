"use client"

import { toast } from "sonner";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { createId } from "@paralleldrive/cuid2";
import {
  GlobeIcon,
  MousePointerIcon
} from "lucide-react";

import { NodeType } from "@/generated/prisma";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string
}

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger manual",
    description: "Runs the flow on clicking a button. Good for getting started quickly.",
    icon: MousePointerIcon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTPP_REQUEST,
    label: "HTTP Request",
    description: "Makes an HTTP request",
    icon: GlobeIcon,
  },
];

type NodeSelectorProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NodeSelector = ({
  children,
  open,
  onOpenChange
}: NodeSelectorProps) => {

  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback((selectedNode: NodeTypeOption) => {
    // Check if trying to add a munal trigger when one already exists.
    if (selectedNode.type === NodeType.MANUAL_TRIGGER) {
      const nodes = getNodes();
      const hasManualTrigger = nodes.some(
        node => node.type === NodeType.MANUAL_TRIGGER,
      );

      if (hasManualTrigger) {
        toast.error("Only one manual trigger is allowed per workflow.");
        return;
      }
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const flowPosition = screenToFlowPosition({
      x: centerX + (Math.random() - 0.5) * 200,
      y: centerY + (Math.random() - 0.5) * 200,
    });
    const newNode = {
      id: createId(),
      data: {},
      position: flowPosition,
      type: selectedNode.type,
    }
    setNodes(prevNodes => {
      const hasInitialNode = prevNodes.some(
        node => node.type === NodeType.INITIAL,
      );
      
      if (hasInitialNode) {
        return [newNode];
      }

      return [...prevNodes, newNode];
    });
    onOpenChange(false);
  }, [
    setNodes,
    getNodes,
    onOpenChange,
    screenToFlowPosition,
  ]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>
            What triggers this workflow?
          </SheetTitle>
          <SheetDescription>
            A trigger is a step that starts your workflow.
          </SheetDescription>
        </SheetHeader>
        <div>
          {triggerNodes.map(triggerNode => {
            const Icon = triggerNode.icon;

            return (
              <div
                key={triggerNode.type}
                className="justify-start w-full h-auto px-4 py-5 border-l-2 border-transparent rounded-none cursor-pointer hover:border-l-primary"
                onClick={() => handleNodeSelect(triggerNode)}
              >
                <div className="flex items-center gap-x-6 w-full overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={triggerNode.label}
                      className="size-5 rounded-sm object-contain"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}
                  <div className="flex flex-col items-start gap-y-1 text-left">
                    <span className="font-medium text-sm">
                      {triggerNode.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {triggerNode.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Separator />
        <div>
          {executionNodes.map(executionNode => {
            const Icon = executionNode.icon;

            return (
              <div
                key={executionNode.type}
                className="justify-start w-full h-auto px-4 py-5 border-l-2 border-transparent rounded-none cursor-pointer hover:border-l-primary"
                onClick={() => handleNodeSelect(executionNode)}
              >
                <div className="flex items-center gap-x-6 w-full overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={executionNode.label}
                      className="size-5 rounded-sm object-contain"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}
                  <div className="flex flex-col items-start gap-y-1 text-left">
                    <span className="font-medium text-sm">
                      {executionNode.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {executionNode.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
