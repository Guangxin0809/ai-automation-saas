'use client'

import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button'

import { LogoutButton } from './logout-button'

const Page = () => {

  const trpc = useTRPC()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const testAiMutation = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success('Test AI job queued')
      },
      onError: () => {
        toast.error('Something went wrong')
      }
    })
  )

  const createWorkflowMutation = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success('Job queued')
      },
      onError: () => {
        toast.error('Something went wrong')
      }
    })
  )

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 min-w-screen min-h-screen">
      protected server component
      <pre>{JSON.stringify(data, null, 4)}</pre>

      <Button
        disabled={createWorkflowMutation.isPending}
        onClick={() => createWorkflowMutation.mutate()}
      >
        Create Workflow
      </Button>

      <Button
        disabled={testAiMutation.isPending}
        onClick={() => testAiMutation.mutate()}
      >
        Test AI
      </Button>

      <LogoutButton />
    </div>
  )
}

export default Page