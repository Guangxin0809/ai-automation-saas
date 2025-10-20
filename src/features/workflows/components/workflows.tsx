"use client";

import { useRouter } from "next/navigation";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import type { Workflow } from "@/generated/prisma";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView
} from "@/components/common/entity-components";

import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";

export const WorkflowsList = () => {

  const workflows = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowsItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  );
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

export const WorkflowsLoading = () => (
  <LoadingView message="Loading workflows..." />
);

export const WorkflowsError = () => (
  <ErrorView message="Error loading workflows" />
);

export const WorkflowsEmpty = () => {

  const router = useRouter();
  const createWorkflowMutation = useCreateWorkflow();
  const { modal: UpgradeModal, handleError } = useUpgradeModal();

  const handleCreateWorkflow = () => {
    createWorkflowMutation.mutate(undefined, {
      onError: handleError,
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      }
    });
  }

  return (
    <>
      {UpgradeModal}
      <EmptyView
        message="You haven't create any workflows yet. Get started by creating your first workflow."
        disabled={createWorkflowMutation.isPending}
        onNew={handleCreateWorkflow}
      />
    </>
  );
}

export const WorkflowsItem = ({ data }: { data: Workflow }) => {

  const removeWorkflowMutation = useRemoveWorkflow();

  const handleRemoveWorkflow = () => {
    removeWorkflowMutation.mutate({ id: data.id });
  }

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Update {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="flex justify-center items-center">
          <WorkflowIcon size={20} className="text-muted-foreground" />
        </div>
      }
      isRemoving={removeWorkflowMutation.isPending}
      onRemove={handleRemoveWorkflow}
    />
  );
}
