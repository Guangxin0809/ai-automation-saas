"use client";

import { useRouter } from "next/navigation";

import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { EntityContainer, EntityHeader } from "@/components/common/entity-components";

import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";

export const WorkflowsList = () => {

  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex justify-center items-center flex-1">
      <pre>{JSON.stringify(workflows.data, null, 4)}</pre>
    </div>
  )
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {

  const router = useRouter();
  const createWorkflowMutation = useCreateWorkflow();
  const { modal: upgradeModal, handleError } = useUpgradeModal();

  const handleCreateWorkflow = () => {
    createWorkflowMutation.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  }

  return (
    <>
      {upgradeModal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflowMutation.isPending}
        onNew={handleCreateWorkflow}
      />
    </>
  );
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => (
  <EntityContainer
    header={<WorkflowsHeader />}
    search={<></>}
    pagination={<></>}
  >
    {children}
  </EntityContainer>
);
