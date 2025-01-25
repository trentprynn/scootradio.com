import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'

export function AboutPopover() {
    return (
        <Popover className="relative">
            <PopoverButton className="block text-sm font-semibold text-gray-600 hover:text-gray-900 focus:outline-hidden dark:text-gray-300 dark:hover:text-white">
                About
            </PopoverButton>
            <PopoverBackdrop className="fixed inset-0" />
            <PopoverPanel
                transition
                className="absolute right-0 mt-2 w-60 rounded-xl border border-gray-200 bg-white text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden dark:border-gray-700 dark:bg-gray-800 dark:ring-white/10"
            >
                <div className="space-y-2 p-3">
                    <a
                        className="block rounded-lg px-3 py-2 text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        href="https://trentprynn.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="font-semibold">Creator</p>
                        <p className="text-gray-600 dark:text-gray-400">Trent Prynn</p>
                    </a>
                    <a
                        className="block rounded-lg px-3 py-2 text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        href="https://github.com/trentprynn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="font-semibold">Source</p>
                        <p className="text-gray-600 dark:text-gray-400">GitHub</p>
                    </a>
                    <a
                        className="block rounded-lg px-3 py-2 text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        href="https://venmo.com/u/TrentPrynn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="font-semibold">Support</p>
                        <p className="text-gray-600 dark:text-gray-400">Venmo</p>
                    </a>
                </div>
            </PopoverPanel>
        </Popover>
    )
}
