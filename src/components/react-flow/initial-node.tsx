"use client";

import { memo } from "react";
import { PlusIcon } from "lucide-react";
import type { NodeProps } from "@xyflow/react";

import { WorkflowNode } from "./workflow-node";
import { PlaceholderNode } from "./placeholder-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode showToolbar={false}>
      <PlaceholderNode
        {...props}
        onClick={() => {}}
      >
        <div className="flex justify-center items-center cursor-pointer">
          <PlusIcon size={16} />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
})

InitialNode.displayName = "InitialNode";
