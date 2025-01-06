import Link from 'next/link'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth } from '@/lib/auth'

import Subscriptions from './subscriptions'
import { Button, buttonVariants } from './ui/button'

export function ProfileButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          My account
        </Button>
      </DialogTrigger>
      <ProfileContent />
    </Dialog>
  )
}

async function ProfileContent() {
  const session = await auth()

  if (!session?.user) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Not logged in</DialogTitle>
          <Link
            href="/login"
            className={buttonVariants({
              variant: 'link',
              className: 'text-base',
              size: 'sm'
            })}
          >
            Login
          </Link>
        </DialogHeader>
      </DialogContent>
    )
  }

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
