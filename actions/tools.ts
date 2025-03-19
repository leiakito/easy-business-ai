'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import prisma from '@/prisma/client'
import { ChatSettings } from '@/store/chat.store'

// Schema validation for tool data
const toolSchema = z.object({
  name: z.string().min(1, 'Tool name is required'),
  description: z.string().optional(),
  isPublic: z.boolean().optional().default(false),
  settings: z.object({
    model: z.string(),
    systemPrompt: z.string(),
    openingMessage: z.string().optional()
  })
})

/**
 * Fetch all tools for the current user
 * @returns Array of tools
 */
export async function fetchTools() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  try {
    const tools = await prisma.tool.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        conversations: {
          orderBy: {
            updatedAt: 'desc'
          },
          take: 1,
          select: {
            id: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    // Transform the result to include lastConversationId and lastMessageId
    return tools.map((tool) => {
      const lastConversation = tool.conversations[0]
      return {
        ...tool,
        lastConversationId: lastConversation?.id,
        conversations: undefined // Remove the conversations array from the result
      }
    })
  } catch (error) {
    console.error('Failed to fetch tools:', error)
    throw new Error('Failed to fetch tools')
  }
}
/**
 * Create a new tool
 * @param data Tool data including name, description, and settings
 * @returns Created tool
 */
export async function createTool(data: {
  name: string
  description?: string
  isPublic?: boolean
  settings: Partial<ChatSettings> & {
    openingMessage?: string
  }
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  // Validate input data
  const validatedData = toolSchema.parse(data)

  try {
    const tool = await prisma.tool.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        isPublic: validatedData.isPublic || false,
        settings: {
          ...validatedData.settings,
          openingMessage: validatedData.settings.openingMessage || ''
        },
        user: {
          connect: { id: session.user.id }
        }
      }
    })
    revalidatePath('/tools')
    return tool
  } catch (error) {
    console.error('Failed to create tool:', error)
    throw new Error('Failed to create tool')
  }
}

/**
 * Update an existing tool
 * @param id Tool ID
 * @param data Updated tool data
 * @returns Updated tool
 */
export async function updateTool(
  id: string,
  data: {
    name: string
    description?: string
    isPublic?: boolean
    settings?: Partial<ChatSettings> & {
      openingMessage?: string
    }
  }
) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  // Validate input data
  const validatedData = toolSchema.parse(data)

  try {
    // First check if the tool belongs to the current user
    const existingTool = await prisma.tool.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingTool) {
      throw new Error('Tool not found or you do not have permission to update it')
    }

    const tool = await prisma.tool.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ...(validatedData.isPublic !== undefined && { isPublic: validatedData.isPublic }),
        settings: {
          ...(existingTool.settings as any),
          ...validatedData.settings,
          openingMessage: validatedData.settings?.openingMessage || (existingTool.settings as any)?.openingMessage || ''
        }
      }
    })
    revalidatePath('/tools')
    return tool
  } catch (error) {
    console.error('Failed to update tool:', error)
    throw new Error('Failed to update tool')
  }
}

/**
 * Delete a tool
 * @param id Tool ID
 * @returns Success status
 */
export async function deleteTool(id: string) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  try {
    // First check if the tool belongs to the current user
    const existingTool = await prisma.tool.findFirst({
      where: {
        id
      }
    })

    if (!existingTool) {
      throw new Error('Tool not found or you do not have permission to delete it')
    }

    await prisma.tool.delete({
      where: { id }
    })
    revalidatePath('/tools')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete tool:', error)
    throw new Error('Failed to delete tool')
  }
}

/**
 * Get a tool by ID
 * @param id Tool ID
 * @returns Tool or null if not found
 */
export async function getToolById(id: string) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  try {
    const tool = await prisma.tool.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })
    return tool
  } catch (error) {
    console.error('Failed to get tool:', error)
    throw new Error('Failed to get tool')
  }
}
