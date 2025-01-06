import { Menu } from 'lucide-react'

import { NamedLogoWithLink } from './logo'
import { NegativeChat, NegativeHome, NegativePricing } from './nagative.client'
import { ProfileButton } from './profile'
import SignOut from './sign-out'
import ToggleTheme from './toggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

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
              <NegativeChat />
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
      </div>
    </nav>
  )
}
