'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import { Button } from './ui/button'

function SignOut() {
  const session = useSession()
  const router = useRouter()

  const handleSignInOrOut = () => {
    if (session.status === 'authenticated') signOut({ callbackUrl: '/' })
    else router.push('/login')
  }

  if (session.status !== 'authenticated')
    return (
      <Button onClick={handleSignInOrOut} variant="link" size="sm">
        Log In
      </Button>
    )

  return (
    <Button onClick={handleSignInOrOut} variant="link" size="sm">
      Sign Out
    </Button>
  )
}

export default SignOut
