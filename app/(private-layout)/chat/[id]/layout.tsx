import { ChatClientFetch } from '@/components/chat-client-fetch'
import ChatMenu from '@/components/chat-menu'
import Navbar from '@/components/navbar'

type Params = Promise<{ id: string }>

export default async function ChatLayout(props: { children: React.ReactNode; params: Params }) {
  const { id } = await props.params

  return (
    <main className="flex-grow px-5 sm:px-10">
      <ChatClientFetch />
      <Navbar>
        <ChatMenu id={id} />
      </Navbar>

      <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:gap-12">
        <div className="w-full">{props.children}</div>
      </div>
    </main>
  )
}
