import prisma from '@/lib/prisma'

import { inngest } from '@/inngest/client'

import { createTRPCRouter, protectedProcedure } from '../init'

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany()
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'guangxinyu1998@gmail.com'
      }
    })

    return { success: true, message: 'job queued' }
  })
})

// export type definition of API
export type AppRouter = typeof appRouter