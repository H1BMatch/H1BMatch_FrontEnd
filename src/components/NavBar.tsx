import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Home, Briefcase, User } from 'lucide-react'

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="bg-background border-r h-screen w-64 fixed left-0 top-0 p-4">
      <div className="flex flex-col space-y-4">
        <Link href="/">
          <Button variant={pathname === '/match' ? 'default' : 'ghost'} className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link href="/jobs-applied">
          <Button variant={pathname === '/jobs-applied' ? 'default' : 'ghost'} className="w-full justify-start">
            <Briefcase className="mr-2 h-4 w-4" />
            Jobs Applied
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant={pathname === '/profile' ? 'default' : 'ghost'} className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
      </div>
    </nav>
  )
}
