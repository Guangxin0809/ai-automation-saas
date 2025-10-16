
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { polar, checkout, portal, usage } from '@polar-sh/better-auth'

import { PrismaClient } from '@/generated/prisma'

import { polarClient } from './polar'

const prisma = new PrismaClient()
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql'
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true
    },
    plugins: [
      polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use: [
          checkout({
            products: [
              {
                productId: '1d9084a9-9b5f-45ce-ac8f-22e8103be8e1',
                slug: 'pro'
              }
            ],
            successUrl: process.env.POLAR_SUCCESS_URL,
            authenticatedUsersOnly: true,
          }),
          portal(),
          usage(),
        ]
      })
    ]
})