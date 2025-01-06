import Link from 'next/link'

import { NamedLogoWithLink } from './logo'
import ToggleTheme from './toggle'
import { buttonVariants } from './ui/button'
// import ToggleTheme from "./toggle";

export default function HeroNav() {
  return (
    <nav className="sticky top-0 mb-7 flex h-24 w-full flex-row items-center justify-between bg-background">
      <NamedLogoWithLink />
      <div className="flex flex-row items-center">
        <ToggleTheme />
        <Link
          href="/login"
          className={buttonVariants({
            variant: 'link',
            className: 'text-base sm:ml-3',
            size: 'sm'
          })}
        >
          Login
        </Link>
        <Link
          href="/register"
          className={buttonVariants({
            variant: 'link',
            className: 'text-base',
            size: 'sm'
          })}
        >
          Register
        </Link>
      </div>
    </nav>
  )
}
