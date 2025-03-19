'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import prisma from '@/prisma/client'

export async function deleteConversation(id: string) {
  await prisma.conversation.delete({
    where: { id }
  })
  revalidatePath(`/chat/${id}`)
}

export async function getTool(id: string) {
  const session = await auth()
  if (!session?.user) return null

  const res = await prisma.tool.findUnique({
    where: {
      id
    },
    include: {
      conversations: {
        orderBy: {
          updatedAt: 'desc'
        },
        take: 20,
        include: {
          messages: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 1,
            select: {
              role: true,
              id: true,
              content: true,
              createdAt: true
            }
          }
        }
      }
    }
  })
  return res
}

export async function getConversationsWithMessages(id: string) {
  const res = await prisma.conversation.findUnique({
    where: {
      id: id
    },
    include: {
      messages: true
    }
  })

  revalidatePath(`/conversation/${id}`)

  return res
}
