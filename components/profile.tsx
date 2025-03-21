import Link from 'next/link'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth } from '@/lib/auth'

import Subscriptions from './subscriptions'
import { Button } from './ui/button'

export async function ProfileButton() {
  const session = await auth()

  if (!session?.user)
    return (
      <Link href="/login">
        <Button variant="link" size="sm">
          Login
        </Button>
      </Link>
    )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          My Account
        </Button>
      </DialogTrigger>
      <ProfileContent />
    </Dialog>
  )
}

async function ProfileContent() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>My account</DialogTitle>
        <div className="flex flex-col gap-6 pb-4 pt-8">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" disabled value={session.user.email ?? ''} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input disabled id="username" value={session.user.name ?? ''} />
          </div>
          <Subscriptions subscriptions={session.user.subscriptions} />
        </div>
      </DialogHeader>
    </DialogContent>
  )
}
