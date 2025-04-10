'use client'

import { Tool } from '@prisma/client'
import { Pencil, Trash2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { newChat } from '@/actions/chat'
import { deleteTool } from '@/actions/tools'
import { Button } from '@/components/ui/button'
import { generateRandomId } from '@/lib/utils'
import { useChatStore } from '@/store/chat.store'

import { ToolDialog } from './tool-dialog'

interface ToolItemProps {
  tool: Tool & {
    lastConversationId: string | null
  }
}

export function ToolItem({ tool }: ToolItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const addSession = useChatStore((state) => state.addSession)

  const router = useRouter()

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this tool?')) {
      setIsDeleting(true)
      try {
        await deleteTool(tool.id)
        toast.success('Tool deleted successfully')
      } catch (error) {
        toast.error('Failed to delete tool')
        console.error('Failed to delete tool:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  async function toTool() {
    if (tool?.lastConversationId) {
      router.push(`/chat/${tool.id}-${tool.lastConversationId}`)
    } else {
      const chatId = generateRandomId(24)
      addSession({
        conversationId: chatId,
        messages: [],
        lastMessageId: null
      })
      await newChat(chatId, tool.id)
      router.push(`/chat/${tool.id}-${chatId}`)
    }
  }

  return (
    <div onClick={toTool} className="cursor-pointer rounded-lg border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium">{tool.name}</h3>

        {!tool.isPublic && <Lock size={16} />}
      </div>
      {tool.description && <p className="mb-4 text-sm text-muted-foreground">{tool.description}</p>}

      <div onClick={(e) => e.stopPropagation()} className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
          <Pencil size={16} className="mr-1" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
          <Trash2 size={16} className="mr-1" /> {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
        <ToolDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} tool={tool} />
      </div>
    </div>
  )
}
