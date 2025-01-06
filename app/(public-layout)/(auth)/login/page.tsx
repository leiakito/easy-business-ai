import { redirect } from 'next/navigation'

import GoogleLogin from '@/components/google-login'
import { getUser } from '@/lib/auth'

export default async function Login() {
  const session = await getUser()
  if (session?.user) redirect('/chat')
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
      <h3 className="text-center text-2xl font-bold">Login to LinkAI</h3>
      <GoogleLogin />
    </div>
  )
}
