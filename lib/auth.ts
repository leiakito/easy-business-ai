import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { AUTH_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '@/constant/config'
import { FreePlan } from '@/constant/plan'

import prisma from '../prisma/client'

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: async ({ token, trigger }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email
        },
        include: {
          subscriptions: true
        }
      })
      if (trigger === 'signUp' && token.email) {
        await prisma.user.update({
          where: { email: token.email },
          data: {
            subscriptions: {
              create: FreePlan
            }
          }
        })
      }
      if (db_user) {
        token.id = db_user.id
        token.subscriptions = db_user.subscriptions
      }
      return token
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user = {
          ...session.user,
          // @ts-expect-error: has id
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
          subscriptions: token.subscriptions as any
        }
      }

      return session
    }
  }
})
