'use client'

import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'

import { useToast } from '@/components/ui/use-toast'
import { OPEN_ROUTER_API_KEY } from '@/constant/config'
import { generateRandomId } from '@/lib/utils'
import { DEFAULT_CHAT_SETTINGS, useChatStore } from '@/store/chat.store'

import { checkUserTokenLimit, createMessage, updateUserTokenUsage } from './chat'
import { getConversationsWithMessages } from './conversation'

export type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const useChat = (conversationId: string) => {
  const appendMessage = useChatStore((i) => i.appendMessage)
  const addSession = useChatStore((i) => i.addSession)
  const sessions = useChatStore((i) => i.sessions)
  const { toast } = useToast()

  async function createCompletion(message: string, scrollToBottom: () => void) {
    const isLimit = await checkUserTokenLimit()
    if (isLimit) {
      toast({
        title: 'Token limit reached',
        description: 'Please upgrade your subscription to continue using the chat feature.'
      })
      return
    }
    const useAssistantId = generateRandomId(24)
    const session = sessions[conversationId]
    const chatSettings = session?.chatSettings ?? DEFAULT_CHAT_SETTINGS

    if (!session) {
      addSession({
        conversationId,
        messages: [
          {
            id: useAssistantId,
            role: 'user',
            content: message
          }
        ]
      })
    } else {
      appendMessage(
        {
          id: useAssistantId,
          role: 'user',
          content: message
        },
        conversationId
      )
    }

    createMessage({
      id: useAssistantId,
      role: 'user',
      content: message,
      tokenCount: 0,
      conversationId: conversationId
    })

    getConversationsWithMessages(conversationId)

    const openrouter = createOpenRouter({
      apiKey: OPEN_ROUTER_API_KEY
    })

    const systemMessage = { role: 'system' as const, content: chatSettings.systemPrompt }
    const historyMessages = (session?.messages ?? []).map((i) => ({ ...i, role: i.role }))
    const userMessage = { role: 'user' as const, content: message }

    const response = streamText({
      model: openrouter(chatSettings.model),
      messages: [systemMessage, ...historyMessages, userMessage],
      maxTokens: chatSettings.maxTokens,
      temperature: chatSettings.temperature,
      topP: chatSettings.topP,
      frequencyPenalty: chatSettings.frequencyPenalty,
      presencePenalty: chatSettings.presencePenalty,
      maxRetries: 3
    })

    const assistantId = generateRandomId(24)
    appendMessage(
      {
        id: assistantId,
        role: 'assistant',
        content: ''
      },
      conversationId
    )
    let str = ''

    setTimeout(() => {
      scrollToBottom()
    }, 200)

    try {
      for await (const textPart of response.textStream) {
        str += textPart
        requestAnimationFrame(() => {
          appendMessage(
            {
              id: assistantId,
              role: 'assistant',
              content: textPart
            },
            conversationId,
            assistantId
          )
        })
      }

      const usage = await response.usage

      const assistantTokenCount = usage.completionTokens

      createMessage({
        id: assistantId,
        conversationId: conversationId,
        role: 'assistant',
        content: str,
        tokenCount: assistantTokenCount
      })

      updateUserTokenUsage(usage.totalTokens)
    } catch (error) {
      console.error('Error in createCompletion:', error)
      toast({
        title: 'Error occurred',
        description: 'An error occurred while processing your request. Please try switching to another model.',
        variant: 'destructive'
      })

      // Remove the incomplete assistant message
      appendMessage(
        {
          id: assistantId,
          role: 'assistant',
          content: 'An error occurred. Please try again or switch to another model.'
        },
        conversationId,
        assistantId
      )
    }
  }

  return {
    createCompletion
  }
}
