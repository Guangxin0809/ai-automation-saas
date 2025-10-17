import { toast } from "sonner";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created`);
        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions(),
        );
      },
      onError: (error: any) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    })
  );
}
