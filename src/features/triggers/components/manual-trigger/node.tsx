"use client";

import { memo, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";

import { NodeStatus } from "@/components/react-flow/node-status-indicator";

import { ManualTriggerDialog } from "./dialog";
import { BaseTriggerNode } from "../base-trigger-node";

export const ManualTriggerNode = memo((props: NodeProps) => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus: NodeStatus = "initial";

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <ManualTriggerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={() => {}}
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
