import { NodeType } from "@/generated/prisma";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";

import { NodeExecutor } from "../types";
import { httpRequestExecutor } from "../components/http-request/executor";

export const ExecutorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTPP_REQUEST]: httpRequestExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
}

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = ExecutorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
}
