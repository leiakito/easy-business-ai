import { Menu } from 'lucide-react'
import Link from 'next/link'

import { getIsMobile } from '@/lib/mobile'
import { cn } from '@/lib/utils'

import { NamedLogoWithLink } from './logo'
import { NegativeHome, NegativePricing } from './nagative.client'
import { ProfileButton } from './profile'
import SignOut from './sign-out'
import ToggleTheme from './toggle'
import { buttonVariants } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export default async function Navbar({
  children,
  className,
  rightChildren
}: {
  children?: React.ReactNode
  rightChildren?: React.ReactNode
  className?: string
}) {
  const isMobile = await getIsMobile()

  if (!isMobile)
    return (
      <nav className={cn('sticky top-0 z-50 flex h-16 items-center justify-between sm:mb-7 md:h-20', className)}>
        <NamedLogoWithLink />
        <div>
          <Link
            className={buttonVariants({
              variant: 'link',
              className: 'text-base',
              size: 'sm'
            })}
            href="/tools"
          >
            Tools
          </Link>
          <NegativePricing />
          <ProfileButton />
          <ToggleTheme />
        </div>
      </nav>
    )

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 flex h-16 w-full flex-row items-center justify-between bg-background sm:mb-7 md:h-20',
        className
      )}
    >
      <div className="flex w-full flex-row items-center justify-between">
        {children ? children : <NamedLogoWithLink />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col">
            <DropdownMenuItem className="justify-center">
              <Link href="/tools">Tools</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ProfileButton />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NegativePricing />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NegativeHome />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ToggleTheme />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {rightChildren}
      </div>
    </nav>
  )
}
