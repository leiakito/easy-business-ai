'use client'

import { ElementRef, useRef } from 'react'

import { useChat } from '@/actions/chat.client'
import Submit from '@/components/submit'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { ChatItem, useChatStore } from '@/store/chat.store'

type ChatProps = {
  id: string
}

export default function Chat({ id }: ChatProps) {
  const scrollRef = useRef<ElementRef<'div'>>(null)
  const sessions = useChatStore((state) => state.sessions)
  const messages = sessions[id]?.messages

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'instant' })
    }
  }

  return (
    <div className="grow">
      <div className="flex min-h-[80vh] flex-col items-start gap-4 pb-10 sm:w-[95%] md:gap-8">
        {!messages?.length ? (
          <>
            <div className="text-xl font-medium text-sky-700 dark:text-sky-200">How can I help you today?</div>
            <div className="text-slate-900 dark:text-slate-300">
              LinkAI can make mistakes. Consider checking important information.
            </div>
          </>
        ) : (
          messages?.map((message) => <MessageItem key={message.id} message={message} />)
        )}
      </div>
      <div ref={scrollRef}></div>
      <div className="sticky bottom-0 mt-5 bg-background pb-8 pt-1">
        <ChatInput id={id} scrollToBottom={scrollToBottom} />
      </div>
    </div>
  )
}

type MessageItemProps = {
  message: ChatItem
}

function MessageItem({ message }: MessageItemProps) {
  const roleStyles: Record<string, string> = {
    user: 'bg-blue-100 dark:bg-blue-900',
    assistant: 'bg-green-100 dark:bg-green-900',
    system: 'bg-gray-100 dark:bg-gray-800'
  }

  return (
    <div className={`flex w-full flex-col items-start gap-2 rounded-lg p-4 ${roleStyles[message.role]}`}>
      <h4 className="text-lg font-medium text-sky-700 dark:text-sky-200">
        {message.role === 'user' ? 'You' : 'Assistant'}
      </h4>
      {message.content ? (
        <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-300">{message.content}</p>
      ) : (
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-[20px] w-[90%] rounded-md" />
          <Skeleton className="h-[20px] w-[60%] rounded-md" />
        </div>
      )}
    </div>
  )
}

type ConversationComponent = {
  id: string
  scrollToBottom: () => void
}

function ChatInput({ id, scrollToBottom }: ConversationComponent) {
  const inputRef = useRef<ElementRef<'input'>>(null)

  const { createCompletion } = useChat(id)

  async function handleSubmit(formData: FormData) {
    const message = formData.get('message') as string
    if (!message) return

    if (inputRef.current) {
      inputRef.current.value = ''
    }
    await createCompletion(message, scrollToBottom)
  }

  return (
    <form action={handleSubmit} className="flex flex-row items-center gap-2 sm:pr-5">
      <Input ref={inputRef} autoComplete="off" name="message" placeholder="Ask me something..." className="h-12" />
      <Submit />
    </form>
  )
}
