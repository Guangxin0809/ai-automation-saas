"use client";

import { useRouter } from "next/navigation";

import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch
} from "@/components/common/entity-components";

import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";

export const WorkflowsList = () => {

  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex justify-center items-center flex-1">
      <pre>{JSON.stringify(workflows.data, null, 4)}</pre>
    </div>
  )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => (
  <EntityContainer
    header={<WorkflowsHeader />}
    search={<WorkflowsSearch />}
    pagination={<WorkflowsPagination />}
  >
    {children}
  </EntityContainer>
)

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {

  const router = useRouter();
  const createWorkflowMutation = useCreateWorkflow();
  const { modal: upgradeModal, handleError } = useUpgradeModal();

  const handleCreateWorkflow = () => {
    createWorkflowMutation.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: handleError,
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

export const WorkflowsSearch = () => {

  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({ params, setParams });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
}

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={page => setParams({ ...params, page })}
    />
  );
}
