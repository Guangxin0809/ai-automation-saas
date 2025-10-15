'use client'

import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button'

import { LogoutButton } from './logout-button'

const Page = () => {

  const trpc = useTRPC()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const handleCreateWorkflowSuccess = () => {
    toast.success('Job queued')
  }

  const createWorkflowMutation = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: handleCreateWorkflowSuccess
    })
  )

  const onSayHi = async () => {
    const res = await fetch('/api/hello')
    console.log('hello', res)
  }

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

      <Button onClick={onSayHi}>
        Say Hi
      </Button>

      <LogoutButton />
    </div>
  )
}

export default Page