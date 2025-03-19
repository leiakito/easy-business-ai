'use client'

import { formatDistanceToNow } from 'date-fns'
import { Plus, MessageSquare, Settings } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { newChat } from '@/actions/chat'
import DeleteConversation from '@/components/conversations/delete-conversation'
import { SettingsForm } from '@/components/settings-panel'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
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

export default function MobileChatMenu({ toolId, conversations, settings, conversationId }: ChatSidebarProps) {
  const [isConversationsOpen, setIsConversationsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const addSession = useChatStore((state) => state.addSession)

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Chat Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={handleNewChat}>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Chat</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsConversationsOpen(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Conversations</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Chat Settings</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Conversations Dialog */}
      <Sheet open={isConversationsOpen} onOpenChange={setIsConversationsOpen}>
        <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle>Conversations</SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="space-y-1 p-4">
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
                    <Link
                      href={`/chat/${toolId}-${item.id}`}
                      className="flex-grow"
                      onClick={() => setIsConversationsOpen(false)}
                    >
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
        </SheetContent>
      </Sheet>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Settings</DialogTitle>
          </DialogHeader>
          <SettingsForm conversationId={conversationId} settings={settings} />
        </DialogContent>
      </Dialog>
    </>
  )
}
