import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Subscription } from '@prisma/client'
import { AuthOptions, DefaultSession, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { AUTH_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '@/constant/config'
import { FreePlan } from '@/constant/plan'

import prisma from '../prisma/client'



declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      subscriptions: Subscription[]
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}

export const authConfig: AuthOptions = {
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
      if (db_user) token.id = db_user.id
      return token
    },
    session: async ({ token, session }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: token.id
        },
        include: {
          subscriptions: true
        }
      })
      if (user) {
        session.user = user
        return session
      }
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    }
  }
}

export async function getUser() {
  return await getServerSession(authConfig)
}
