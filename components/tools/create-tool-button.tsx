'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { ToolDialog } from './tool-dialog'

export function CreateToolButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
        <Plus size={16} /> Add Tool
      </Button>

      <ToolDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} tool={null} />
    </>
  )
}
