'use client'

import { Tool } from '@prisma/client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

import { createTool, updateTool } from '@/actions/tools'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useChatStore } from '@/store/chat.store'

interface ToolDialogProps {
  open: boolean
  onClose: () => void
  tool: Tool | null
}

export function ToolDialog({ open, onClose, tool }: ToolDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const availableModels = useChatStore((i) => i.models)
  const [model, setModel] = useState('openai/gpt-4o')
  const [systemPrompt, setSystemPrompt] = useState('')
  const [openingMessage, setOpeningMessage] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (tool) {
      setName(tool.name)
      setDescription(tool.description || '')
      setIsPublic(tool.isPublic)

      // Extract settings from the tool if they exist
      const settings = tool.settings as { model?: string; systemPrompt?: string; openingMessage?: string } | undefined
      if (settings) {
        setModel(settings.model || 'openai/gpt-4o')
        setSystemPrompt(settings.systemPrompt || '')
        setOpeningMessage(settings.openingMessage || '')
      } else {
        setModel('openai/gpt-4o')
        setSystemPrompt('')
        setOpeningMessage('')
      }
    } else {
      setName('')
      setDescription('')
      setModel('openai/gpt-4o')
      setSystemPrompt('')
      setOpeningMessage('')
      setIsPublic(false)
    }
  }, [tool, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare the settings object
      const settings = {
        model,
        systemPrompt,
        openingMessage
      }

      if (tool) {
        await updateTool(tool.id, { name, description, isPublic, settings })
        toast.success('Tool updated successfully')
      } else {
        await createTool({ name, description, isPublic, settings })
        toast.success('Tool created successfully')
      }
      onClose()
    } catch (error) {
      toast.error(tool ? 'Failed to update tool' : 'Failed to create tool')
      console.error('Failed to save tool:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{tool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter tool name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter tool description (optional)"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Select value={model} onValueChange={setModel}>
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
            <div className="grid gap-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter system prompt for the AI"
                rows={6}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="openingMessage">Opening Message</Label>
              <Textarea
                id="openingMessage"
                value={openingMessage}
                onChange={(e) => setOpeningMessage(e.target.value)}
                placeholder="Enter an optional opening message for the conversation"
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="isPublic" checked={isPublic} onCheckedChange={(checked) => setIsPublic(checked === true)} />
              <Label htmlFor="isPublic" className="cursor-pointer">
                Make this tool public
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim() || !systemPrompt.trim()}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
