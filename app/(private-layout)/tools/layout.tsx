import { ChatClientFetch } from '@/components/chat-client-fetch'
import Navbar from '@/components/navbar'

export default async function ChatLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow flex-col px-5 sm:px-10">
      <ChatClientFetch />
      <Navbar />
      {props.children}
    </div>
  )
}
