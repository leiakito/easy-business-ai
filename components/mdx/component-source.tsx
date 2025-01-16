'use client'

import * as React from 'react'

import { CodeBlockWrapper } from '@/components/mdx/code-block-wrapper'
import { cn } from '@/lib/utils'

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
}

export function ComponentSource({ children, className }: ComponentSourceProps) {
  return (
    <CodeBlockWrapper expandButtonTitle="Expand" className={cn('overflow-hidden rounded-xl', className)}>
      {children}
    </CodeBlockWrapper>
  )
}
