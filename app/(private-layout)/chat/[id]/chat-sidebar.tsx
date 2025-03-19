'use client'

import { formatDistanceToNow } from 'date-fns'
import { Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { newChat } from '@/actions/chat'
import DeleteConversation from '@/components/conversations/delete-conversation'
import { SettingsForm } from '@/components/settings-panel'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '@/components/ui/responsive-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { generateRandomId } from '@/lib/utils'
import { useChatStore } from '@/store/chat.store'

interface ChatSidebarProps {
  toolId: string
  conversationId: string
  conversations: {
    id: string
    createdAt: Date
    updatedAt: Date
    messages: {
      role: 'assistant' | 'user'
      id: string
      createdAt: Date
      content: string
    }[]
  }[]
  settings: {
    systemPrompt: string
    model: string
  }
}

export default function ChatSidebar({ toolId, conversations, settings, conversationId }: ChatSidebarProps) {
  const addSession = useChatStore((state) => state.addSession)

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleNewChat = () => {
    const chatId = generateRandomId(24)
    addSession({
      conversationId: chatId,
      messages: [],
      lastMessageId: null
    })
    newChat(chatId, toolId)
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-muted/40">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Chats</h2>
        <Button variant="ghost" size="icon" onClick={handleNewChat} title="New Chat">
          <Plus size={18} />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {conversations.map((item) => {
            const isActive = conversationId === item.id

            // Get the first message or use a default title
            const firstUserMessage = item.messages.find((msg) => msg.role === 'user')
            const title = firstUserMessage
              ? firstUserMessage.content.substring(0, 25) + (firstUserMessage.content.length > 25 ? '...' : '')
              : 'New conversation'

            return (
              <div
                key={item.id}
                className={`mb-2 flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent hover:shadow-md ${
                  isActive ? 'border-primary bg-accent' : 'border-gray-200'
                }`}
              >
                <Link href={`/chat/${toolId}-${item.id}`} className="flex-grow">
                  <div className="flex flex-col space-y-2">
                    <p className="line-clamp-2 text-xs text-gray-600">{title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
                {!isActive && (
                  <div className="ml-2">
                    <DeleteConversation id={item.id} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <ResponsiveDialog
          trigger={
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings size={16} className="mr-2" />
              <span>Chat Settings</span>
            </Button>
          }
        >
          <SettingsForm conversationId={conversationId} settings={settings} />
        </ResponsiveDialog>
      </div>
    </div>
  )
}
