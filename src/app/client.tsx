'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'

const Client = () => {

  const trpc = useTRPC()
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions())

  return (
    <pre>
      {JSON.stringify(users, null, 4)}
    </pre>
  )
}

export default Client