import Link from 'next/link'
import { AboutPopover } from './about-popover'
import { ThemeToggle } from './theme-toggle'

export function NavBar() {
    return (
        <nav className="flex items-center justify-between bg-gray-100 p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <div className="flex items-center">
                <Link href={'/'}>
                    <img src="/logo192.png" alt="ScootRadio Logo" className="h-8 w-8" />
                </Link>
                <span className="ml-2 text-xl font-semibold">ScootRadio</span>
            </div>
            <div className="flex items-center space-x-4">
                <ThemeToggle />
                <AboutPopover />
            </div>
        </nav>
    )
}
