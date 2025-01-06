'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { OPEN_ROUTER_API_KEY } from '@/constant/config'
import { auth } from '@/lib/auth'
import prisma from '@/prisma/client'
import { ChatSettings } from '@/store/chat.store'

export async function checkUserTokenLimit(): Promise<boolean> {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      status: 'ACTIVE',
      endDate: {
        gte: new Date()
      }
    },
    select: {
      usedTokens: true,
      totalTokens: true
    }
  })

  if (!activeSubscription) {
    throw new Error('No active subscription found for the user')
  }

  const remainingTokens = activeSubscription.totalTokens - activeSubscription.usedTokens

  return remainingTokens <= 0
}

export async function updateUserTokenUsage(tokensUsed: number) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      status: 'ACTIVE',
      endDate: {
        gte: new Date()
      }
    },
    orderBy: {
      endDate: 'desc'
    }
  })

  if (!activeSubscription) {
    throw new Error('No active subscription found for the user')
  }

  const updatedSubscription = await prisma.subscription.update({
    where: {
      id: activeSubscription.id
    },
    data: {
      usedTokens: {
        increment: tokensUsed
      }
    }
  })

  if (updatedSubscription.usedTokens > updatedSubscription.totalTokens) {
    console.warn(`User ${session.user.id} has exceeded their token limit`)
  }

  revalidatePath('/chat', 'layout')

  return updatedSubscription
}

export async function newChat(id: string) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  await prisma.conversation.create({
    data: {
      id,
      userId: session.user.id
    }
  })
}

export async function createMessage(
  data: Omit<Prisma.MessageCreateInput, 'conversation'> & { conversationId: string }
) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const { conversationId, ...messageData } = data

  const createdMessage = await prisma.message.create({
    data: {
      ...messageData,
      conversation: {
        connect: { id: conversationId }
      }
    }
  })

  return createdMessage
}

export async function saveSettings(userId: string, settings: ChatSettings) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      settings
    }
  })
}

// Add this function to fetch available models from OpenRouter
export async function getAvailableModels() {
  const response = await fetch('https://openrouter.ai/api/v1/models', {
    headers: {
      Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch models from OpenRouter')
  }

  const data = await response.json()
  return data.data.map((model: any) => ({
    id: model.id,
    name: model.name
  }))
}
