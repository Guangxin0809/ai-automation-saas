"use client"

import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel
} from "@xyflow/react";
import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection
} from "@xyflow/react";

import { nodeComponents } from "@/config/node-components";
import { ErrorView, LoadingView } from "@/components/common/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

import { editorAtom } from "../store/atoms";
import { AddNodeButton } from "./add-node-button";

import "@xyflow/react/dist/style.css";

export const Editor = ({ workflowId }: { workflowId: string }) => {

  const setEditor = useSetAtom(editorAtom)
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeComponents}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setEditor}
        fitView
        snapGrid={[10, 10]}
        snapToGrid
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export const EditorLoading = () => (
  <LoadingView message="Loading editor..." />
);

export const EditorError = () => (
  <ErrorView message="Error loading editor..." />
);
