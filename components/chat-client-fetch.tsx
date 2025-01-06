'use client'

import { useCallback, useLayoutEffect } from 'react'

import { getAvailableModels } from '@/actions/chat'
import { useChatStore } from '@/store/chat.store'

export const ChatClientFetch = () => {
  const setModels = useChatStore((i) => i.setModels)
  const storageModels = useChatStore((i) => i.models)
  const isInitialized = useChatStore((i) => i.isInitialized)

  const fetchModels = useCallback(async () => {
    try {
      const models = await getAvailableModels()
      setModels(models)
    } catch (error) {
      console.error('Failed to fetch models:', error)
    }
  }, [setModels])

  useLayoutEffect(() => {
    if (isInitialized && storageModels.length === 0) {
      fetchModels()
    }
  }, [fetchModels, isInitialized, storageModels])

  return null
}
