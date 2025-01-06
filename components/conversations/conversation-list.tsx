'use server'

import { ScrollArea } from '@radix-ui/react-scroll-area'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

import { getConversations } from '@/actions/conversation'
import { SheetClose } from '@/components/ui/sheet'

import DeleteConversation from './delete-conversation'

export default async function ConversationList({ id }: { id: string }) {
  const res = await getConversations()

  if (!res) return null
  const { conversations } = res

  return (
    <ScrollArea className="flex-grow overflow-y-auto px-4">
      {conversations.length === 0 ? (
        <p className="text-center text-muted-foreground">No conversations yet</p>
      ) : (
        conversations.map((cn) => {
          const isActive = id === cn.id
          return (
            <div
              key={cn.id}
              className={`mb-2 flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent hover:shadow-md ${
                isActive ? 'border-primary bg-accent' : 'border-gray-200'
              }`}
            >
              <SheetClose asChild className="flex-grow">
                <Link href={`/chat/${cn.id}?lastMessageId=${cn.messages[0].id}`} className="flex-grow">
                  <div className="flex flex-col space-y-2">
                    <p className="line-clamp-2 text-xs text-gray-600">{cn.messages[0].content}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(cn.updatedAt), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              </SheetClose>
              {!isActive && (
                <div className="ml-2">
                  <DeleteConversation id={cn.id} />
                </div>
              )}
            </div>
          )
        })
      )}
    </ScrollArea>
  )
}
