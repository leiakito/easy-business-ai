import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import ConversationList from './conversation-list'

export default function LeftPanel({ id }: { id: string }) {
  return (
    <Sheet>
      <SheetTrigger>
        <span className="mt-1 flex">Conversations</span>
      </SheetTrigger>
      <SheetContent side="left" className="min-w-[390px] px-0">
        <div className="flex h-full flex-col">
          <h3 className="mb-4 px-7 text-xl font-semibold">Conversations</h3>
          <ConversationList id={id} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
