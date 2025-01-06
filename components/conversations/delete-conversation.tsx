'use client'

import { Trash2 } from 'lucide-react'

import { deleteConversation } from '@/actions/conversation'

import { Button } from '../ui/button'

export default function DeleteConversation({ id }: { id: string }) {
  const handleDelete = async () => {
    await deleteConversation(id)
  }
  return (
    <Button variant="ghost" size="icon" className="ml-2" onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
