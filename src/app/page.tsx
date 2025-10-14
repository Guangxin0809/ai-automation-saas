import { caller } from '@/trpc/server'
import { requireAuth } from '@/lib/auth-utils'

const Page = async () => {

  await requireAuth()
  const users = await caller.getUsers()

  return (
    <div>
      protected server component
      <pre>{JSON.stringify(users, null, 4)}</pre>
    </div>
  )
}

export default Page