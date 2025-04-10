'use client'

import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface ResponsiveDialogProps {
  triggerText?: string
  title?: React.ReactNode | string
  description?: string
  showClose?: boolean
  minWidth?: string
  hideTrigger?: boolean
  hideHeader?: boolean
  hideFooter?: boolean
  drawerCloseText?: string
  className?: string
  drawerContentClass?: string
  drawerDirection?: 'top' | 'bottom' | 'left' | 'right'
  dialogContentClass?: string
  contentClass?: string
  dialogHeaderClass?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  footer?: React.ReactNode
  trigger?: React.ReactNode
  headerEnd?: React.ReactNode
  footerStart?: React.ReactNode
  footerEnd?: React.ReactNode
}

export function ResponsiveDialog({
  triggerText = 'Open Dialog',
  title = 'Dialog',
  description,
  hideTrigger = false,
  hideHeader = false,
  footer,
  className,
  contentClass,
  drawerContentClass,
  drawerDirection = 'bottom',
  dialogContentClass,
  dialogHeaderClass,
  open,
  onOpenChange,
  children,
  trigger
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(open || false)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const renderTrigger = () => {
    if (hideTrigger) return null
    if (trigger) return trigger
    return <Button variant="outline">{triggerText}</Button>
  }

  const renderContent = () => (
    <>
      {!hideHeader && (
        <DialogHeader className={cn('text-left', dialogHeaderClass)}>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-gilroy text-brand6 font-semibold md:text-xl">{title}</DialogTitle>
          </div>
          {description ? (
            <DialogDescription className="mb-2 mt-1 text-left md:mb-0 md:mt-3">{description}</DialogDescription>
          ) : (
            <DialogDescription />
          )}
        </DialogHeader>
      )}
      <div className={cn('flex-1 overflow-y-auto scrollbar-hide', contentClass)}>{children}</div>
      {footer}
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>{renderTrigger()}</SheetTrigger>
        <SheetContent
          side={drawerDirection}
          className={cn('flex max-h-[80dvh] flex-col rounded-t-3xl', className, drawerContentClass)}
        >
          {renderContent()}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{renderTrigger()}</DialogTrigger>
      <DialogContent
        className={cn('h-[660px] max-h-[80vh] max-w-[460px] p-8', className, dialogContentClass)}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
