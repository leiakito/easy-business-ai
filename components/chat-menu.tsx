import { PanelLeftIcon } from 'lucide-react'

import LeftPanel from '@/components/conversations/left-panel'
import SettingsPanel from '@/components/settings-panel'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

export default function ChatMenu({ id }: { id: string }) {
  const dropdownClassName =
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <PanelLeftIcon className="h-6 w-6" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="flex flex-col gap-2 p-2">
        <div className={dropdownClassName}>
          <LeftPanel id={id} />
        </div>
        <div className={dropdownClassName}>
          <SettingsPanel />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
