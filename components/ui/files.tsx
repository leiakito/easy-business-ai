import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { FolderIcon, FolderOpenIcon, FileIcon, ChevronRight } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

export type FileProps = {
  name: string
  className?: string
}

export type FolderProps = {
  name: string
  children: React.ReactNode
  className?: string
}

export const File: React.FC<FileProps> = ({ name, className }) => (
  <div
    className={cn(
      'flex -translate-x-2 cursor-pointer items-center space-x-2 rounded px-2 py-1 text-sm hover:bg-muted',
      className
    )}
  >
    <FileIcon className="h-4 w-4 text-muted-foreground" />
    <span>{name}</span>
  </div>
)

const FolderTrigger: React.FC<{ name: string; className?: string; hasFiles: boolean }> = ({
  name,
  className,
  hasFiles
}) => (
  <AccordionPrimitive.Header className="flex">
    {hasFiles ? (
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 -translate-x-2 items-center rounded px-2 py-1 text-sm font-medium transition-all hover:bg-muted hover:no-underline',
          className
        )}
      >
        <div className="relative flex items-center">
          <ChevronRight className="mr-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
          <FolderIcon className="hidden h-4 w-4 text-muted-foreground group-data-[state=closed]:block" />
          <FolderOpenIcon className="hidden h-4 w-4 text-muted-foreground group-data-[state=open]:block" />
          <span className="ml-2">{name}</span>
        </div>
      </AccordionPrimitive.Trigger>
    ) : (
      <div
        className={cn(
          'flex flex-1 -translate-x-2 items-center rounded px-2 py-1 text-sm font-medium hover:bg-muted',
          className
        )}
      >
        <FolderIcon className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>{name}</span>
      </div>
    )}
  </AccordionPrimitive.Header>
)

const FolderContent: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <AccordionPrimitive.Content
    className={cn(
      'overflow-hidden pl-2 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
  >
    <div className="border-l border-border pl-4">{children}</div>
  </AccordionPrimitive.Content>
)

export const Folder: React.FC<FolderProps> = ({ name, children, className }) => {
  const hasFiles = React.Children.count(children) > 0

  return hasFiles ? (
    <AccordionPrimitive.Item value={name} className={className}>
      <FolderTrigger name={name} hasFiles={hasFiles} />
      <FolderContent>{children}</FolderContent>
    </AccordionPrimitive.Item>
  ) : (
    <FolderTrigger name={name} className={className} hasFiles={hasFiles} />
  )
}

type FilesProps = {
  defaultValue?: string
  children: React.ReactNode
  className?: string
}

export const Files: React.FC<FilesProps> = ({ children, defaultValue, className }) => {
  const defaultOpenFolders = defaultValue ? defaultValue.split('/') : undefined

  return (
    <AccordionPrimitive.Root
      type="multiple"
      className={cn('w-full min-w-[250px]', className)}
      defaultValue={defaultOpenFolders}
    >
      {children}
    </AccordionPrimitive.Root>
  )
}
