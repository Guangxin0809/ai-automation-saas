"use client"

import { memo, useState } from "react";
import { GlobeIcon } from "lucide-react";
import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";

import { NodeStatus } from "@/components/react-flow/node-status-indicator";

import { HttpRequestDialog } from "./dialog";
import { BaseExecutionNode } from "../base-execution-node";

type HttpRequestData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
}

type HttpRequestNodeType = Node<HttpRequestData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {

  const { setNodes } = useReactFlow();
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus: NodeStatus = "initial";
  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method || 'GET'}: ${nodeData.endpoint}`
    : "Not configured";

  const handleSettings = () => setDialogOpen(true);

  const handleSubmit = (values: {
    endpoint: string,
    method: string,
    body?: string,
  }) => {
    setNodes(nodes => nodes.map(node => {
      if (node.id === props.id) {
        return {
          ...node,
          data: {
            ...node.data,
            endpoint: values.endpoint,
            method: values.method,
            body: values.body,
          },
        }
      }

      return node;
    }))
  }

  return (
    <>
      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
      />

      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        status={nodeStatus}
        description={description}
        onSettings={handleSettings}
        onDoubleClick={() => {}}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
