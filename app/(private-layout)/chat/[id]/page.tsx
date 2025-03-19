import { getTool } from '@/actions/conversation'
import Navbar from '@/components/navbar'
import { getIsMobile } from '@/lib/mobile'

import Chat from './chat'
import ChatSidebar from './chat-sidebar'

export default async function ChatSpecificPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isMobile = await getIsMobile()

  const toolId = id.split('-')[0]
  const conversationId = id.split('-')[1]

  const data = await getTool(toolId)

  if (!data) return null

  const lastMessageId = data.conversations.find((i) => i.id === conversationId)?.messages[0]?.id
  const settings = data.settings as {
    systemPrompt: string
    model: string
    openingMessage?: string
  }

  return (
    <div className="flex h-screen px-4 md:px-0">
      {!isMobile && (
        <ChatSidebar
          conversations={data.conversations}
          settings={settings}
          toolId={toolId}
          conversationId={conversationId}
        />
      )}

      <div className="flex flex-grow flex-col md:px-20">
        <Navbar />
        <Chat conversationId={conversationId} settings={settings} lastMessageId={lastMessageId} />
      </div>
    </div>
  )
}
