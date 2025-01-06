import { Menu } from 'lucide-react'
import Link from 'next/link'

import { NamedLogoWithLink } from './logo'
import NegativeChat from './negative-chat'
import { ProfileButton } from './profile'
import ToggleTheme from './toggle'
import { buttonVariants } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const btnVariant = buttonVariants({
  variant: 'link',
  className: 'text-base flex flex-row items-center cursor-pointer',
  size: 'sm'
})

export default function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full flex-row items-center justify-between bg-background sm:mb-7 md:h-20">
      <div className="flex w-full flex-row items-center justify-between">
        {children ? children : <NamedLogoWithLink />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col">
            <DropdownMenuItem asChild>
              <NegativeChat className={btnVariant} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pricing" className={btnVariant}>
                <span>Pricing</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ProfileButton />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ToggleTheme />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
