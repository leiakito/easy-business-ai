'use client'

import { useParams } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useChatStore } from '@/store/chat.store'

import { ScrollArea } from './ui/scroll-area'

export default function SettingsPanel() {
  return (
    <Sheet>
      <SheetTrigger>
        <span>ChatSettings</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] bg-gray-50 dark:bg-gray-900 sm:w-[540px]">
        <div className="flex h-full flex-col">
          <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">ChatSettings</h2>
          <ScrollArea className="flex-grow pr-4">
            <SettingsForm />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SettingsForm() {
  const { id } = useParams<{ id: string }>()
  const sessionsChatSettings = useChatStore((i) => i.sessionsChatSettings)
  const setChatSetting = useChatStore((i) => i.setChatSetting)
  const availableModels = useChatStore((i) => i.models)
  const chatSetting = sessionsChatSettings[id]

  const handleSystemPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatSetting(
      {
        ...chatSetting,
        systemPrompt: e.target.value
      },
      id
    )
  }

  const handleModelChange = (value: string) => {
    setChatSetting(
      {
        ...chatSetting,
        model: value
      },
      id
    )
  }

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseFloat(e.target.value) || 0, 0), 2)
    setChatSetting(
      {
        ...chatSetting,
        temperature: value
      },
      id
    )
  }

  const handleMaxTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 4096)
    setChatSetting(
      {
        ...chatSetting,
        maxTokens: value
      },
      id
    )
  }

  const handleTopPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseFloat(e.target.value) || 0, 0), 1)
    setChatSetting(
      {
        ...chatSetting,
        topP: value
      },
      id
    )
  }

  const handleFrequencyPenaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseFloat(e.target.value) || 0, -2), 2)
    setChatSetting(
      {
        ...chatSetting,
        frequencyPenalty: value
      },
      id
    )
  }

  const handlePresencePenaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseFloat(e.target.value) || 0, -2), 2)
    setChatSetting(
      {
        ...chatSetting,
        presencePenalty: value
      },
      id
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <label htmlFor="systemPrompt" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          System Prompt
        </label>
        <textarea
          id="systemPrompt"
          value={chatSetting.systemPrompt || ''}
          onChange={handleSystemPromptChange}
          placeholder="Enter system prompt"
          rows={18}
          className="w-full bg-gray-100 p-3 dark:bg-gray-700"
        />
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <label htmlFor="model" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Model
        </label>
        <Select onValueChange={handleModelChange} value={chatSetting.model || ''}>
          <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-700">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <label htmlFor="temperature" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Temperature (0 to 2)
        </label>
        <Input
          id="temperature"
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={chatSetting.temperature ?? ''}
          onChange={handleTemperatureChange}
          className="w-full bg-gray-100 dark:bg-gray-700"
        />
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <label htmlFor="maxTokens" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Max Tokens (1 to 4096)
        </label>
        <Input
          id="maxTokens"
          type="number"
          min="1"
          max="4096"
          value={chatSetting.maxTokens ?? ''}
          onChange={handleMaxTokensChange}
          className="w-full bg-gray-100 dark:bg-gray-700"
        />
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <label htmlFor="topP" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Top P (0 to 1)
        </label>
        <Input
          id="topP"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={chatSetting.topP ?? ''}
          onChange={handleTopPChange}
          className="w-full bg-gray-100 dark:bg-gray-700"
        />
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <label htmlFor="frequencyPenalty" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Frequency Penalty (-2 to 2)
        </label>
        <Input
          id="frequencyPenalty"
          type="number"
          min="-2"
          max="2"
          step="0.1"
          value={chatSetting.frequencyPenalty ?? ''}
          onChange={handleFrequencyPenaltyChange}
          className="w-full bg-gray-100 dark:bg-gray-700"
        />
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <label htmlFor="presencePenalty" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Presence Penalty (-2 to 2)
        </label>
        <Input
          id="presencePenalty"
          type="number"
          min="-2"
          max="2"
          step="0.1"
          value={chatSetting.presencePenalty ?? ''}
          onChange={handlePresencePenaltyChange}
          className="w-full bg-gray-100 dark:bg-gray-700"
        />
      </div>
    </div>
  )
}
