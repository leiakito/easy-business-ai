import React, { useRef, useEffect } from 'react'

import { cn } from '@/lib/utils'

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number
  maxRows?: number
}

export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ className, minRows = 1, maxRows = 5, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      const adjustHeight = () => {
        textarea.style.height = 'auto'
        const singleRowHeight = parseInt(window.getComputedStyle(textarea).lineHeight)
        const desiredHeight = Math.min(
          Math.max(textarea.scrollHeight, singleRowHeight * minRows),
          singleRowHeight * maxRows
        )
        textarea.style.height = `${desiredHeight}px`
      }

      textarea.addEventListener('input', adjustHeight)
      adjustHeight() // Initial adjustment

      return () => {
        textarea.removeEventListener('input', adjustHeight)
      }
    }, [minRows, maxRows])

    return (
      <textarea
        ref={(node) => {
          textareaRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        rows={minRows}
        {...props}
      />
    )
  }
)

AutoResizeTextarea.displayName = 'AutoResizeTextarea'
