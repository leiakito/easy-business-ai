import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const STORAGE_ID = 'chat' as const

export const DEFAULT_CHAT_SETTINGS = {
  model: 'cohere/command-r-plus',
  systemPrompt: 'You are an AI assistant. You will be given a task. You must generate a detailed and long answer.',
  maxTokens: 1000,
  temperature: 0.7,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0
}

export type ChatSettings = {
  model: string
  systemPrompt: string
  maxTokens: number
  temperature: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
}

const DEFAULT_STATE = {
  sessionsMessages: {},
  sessionsChatSettings: {},
  models: [],
  isInitialized: false
}

export type ChatItem = {
  id: string
  content: string
  role: 'user' | 'assistant'
}

type Models = Array<{ id: string; name: string }>

type ChatState = {
  models: Models
  sessionsMessages: {
    [conversationId: string]: {
      messages: ChatItem[]
      lastMessageId?: string
    }
  }
  sessionsChatSettings: {
    [conversationId: string]: ChatSettings
  }
  isInitialized: boolean
}

type ChatStateActions = {
  setChatSetting: (settings: ChatSettings, conversationId: string) => void
  addSession: ({ conversationId, messages }: { conversationId: string; messages: ChatItem[] }) => void
  setModels: (models: Models) => void
  appendMessage: (chat: ChatItem, conversationId: string, lastMessageId?: string) => void
  initialize: () => void // New action to set isInitialized to true
}

const PERSISTED_KEYS: (keyof ChatState)[] = ['sessionsMessages', 'sessionsChatSettings', 'models', 'isInitialized']

export type chatProps = ChatState & ChatStateActions

export const useChatStore = create<chatProps>()(
  persist(
    immer((set) => ({
      ...DEFAULT_STATE,
      initialize() {
        set((state) => {
          state.isInitialized = true
        })
      },
      setModels(models) {
        set({
          models
        })
      },
      addSession({ conversationId, messages }) {
        set((state) => {
          state.sessionsMessages[conversationId] = {
            ...state.sessionsMessages[conversationId],
            messages: messages ?? []
          }
          state.sessionsChatSettings[conversationId] = DEFAULT_CHAT_SETTINGS
        })
      },
      appendMessage(chat, conversationId, lastMessageId) {
        set((state) => {
          const session = state.sessionsMessages[conversationId]
          const messageIndex = session.messages.findIndex((c) => c.id === chat.id)

          if (messageIndex !== -1) {
            session.messages[messageIndex].content += chat.content
          } else {
            session.messages.push(chat)
          }
          session.lastMessageId = lastMessageId
        })
      },
      setChatSetting(chatSettings, conversationId) {
        set((state) => {
          if (state.sessionsChatSettings[conversationId]) {
            state.sessionsChatSettings[conversationId] = chatSettings
          }
        })
      }
    })),
    {
      name: STORAGE_ID,
      onRehydrateStorage: () => (state) => {
        // This function is called after the store has been rehydrated
        if (state) {
          state.initialize()
        }
      },
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => PERSISTED_KEYS.includes(key as keyof ChatState)))
    }
  )
)
