'use client'

import { useRef } from 'react'

import { useChat } from '@/actions/chat.client'
import Submit from '@/components/submit'
import { Skeleton } from '@/components/ui/skeleton'
import { AutoResizeTextarea } from '@/components/ui/textarea'
import { ChatItem, useChatStore } from '@/store/chat.store'

type ChatProps = {
  id: string
}

export default function Chat({ id }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sessions = useChatStore((state) => state.sessionsMessages)
  const messages = sessions[id]?.messages

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  return (
    <div className="flex flex-grow flex-col md:px-20">
      <div
        ref={scrollRef}
        className="flex h-0 flex-grow flex-col-reverse items-start gap-4 overflow-y-auto scrollbar-hide md:gap-8"
      >
        <div className="flex-1" />
        {!messages?.length ? (
          <>
            <div className="text-xl font-medium text-gray-700 dark:text-gray-200">How can I help you today?</div>
            <div className="text-gray-600 dark:text-gray-400">
              LinkAI can make mistakes. Consider checking important information.
            </div>
          </>
        ) : (
          messages
            .slice()
            .reverse()
            .map((message) => <MessageItem key={message.id} message={message} />)
        )}
      </div>
      <ChatInput id={id} scrollToBottom={scrollToBottom} />
    </div>
  )
}

type MessageItemProps = {
  message: ChatItem
}

function MessageItem({ message }: MessageItemProps) {
  const roleStyles: Record<string, string> = {
    user: 'bg-blue-100 dark:bg-blue-900 ml-auto',
    assistant: 'bg-green-100 dark:bg-green-900 mr-auto'
  }

  const isUser = message.role === 'user'

  return (
    <div className={`flex w-full flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`flex max-w-[90%] flex-col gap-2 rounded-lg p-4 ${roleStyles[message.role]} ${
          isUser ? '' : 'w-full'
        }`}
      >
        {message.content ? (
          <p
            className={`whitespace-pre-wrap text-slate-900 dark:text-slate-300 ${isUser ? 'text-right' : 'text-left'}`}
          >
            {message.content}
          </p>
        ) : (
          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-[20px] w-full rounded-md" />
            <Skeleton className="h-[20px] w-[60%] rounded-md" />
          </div>
        )}
      </div>
    </div>
  )
}

type ConversationComponent = {
  id: string
  scrollToBottom: () => void
}

function ChatInput({ id, scrollToBottom }: ConversationComponent) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { createCompletion } = useChat(id)

  async function handleSubmit(formData: FormData) {
    const message = formData.get('message') as string
    if (!message) return

    if (inputRef.current) {
      inputRef.current.value = ''
    }
    await createCompletion(message, scrollToBottom)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-row items-center gap-2 pb-5">
      <AutoResizeTextarea
        ref={inputRef}
        autoComplete="off"
        name="message"
        placeholder="Ask me something..."
        className="min-h-12 resize-none"
        minRows={1}
        maxRows={5}
        onKeyDown={handleKeyDown}
      />
      <Submit />
    </form>
  )
}
