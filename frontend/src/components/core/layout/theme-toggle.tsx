'use client'

import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { FaCheck, FaDesktop, FaMoon, FaSun } from 'react-icons/fa6'

const THEME_OPTIONS = [
    { id: 'light', label: 'Light', Icon: FaSun },
    { id: 'dark', label: 'Dark', Icon: FaMoon },
    { id: 'system', label: 'System', Icon: FaDesktop },
] as const

export function ThemeToggle() {
    const { theme, resolvedTheme, setTheme, systemTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const ButtonIcon = useMemo(() => {
        return resolvedTheme === 'dark' ? <FaMoon className="h-5 w-5" /> : <FaSun className="h-5 w-5" />
    }, [resolvedTheme])

    if (!mounted) {
        // prevents hydration mismatch error
        return null
    }

    return (
        <Popover className="relative inline-block">
            <PopoverButton
                aria-label="Toggle Theme Menu"
                className="rounded-sm p-2 text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden dark:text-gray-100 dark:hover:bg-slate-700"
            >
                {ButtonIcon}
            </PopoverButton>

            <PopoverBackdrop className="fixed inset-0" />

            <PopoverPanel className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-sm border border-gray-200 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-800">
                {({ close }) => (
                    <div className="py-1">
                        {THEME_OPTIONS.map(({ id, label, Icon }) => (
                            <button
                                key={id}
                                onClick={() => {
                                    setTheme(id)
                                    close()
                                }}
                                className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-slate-700"
                            >
                                <span className="flex items-center space-x-2">
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                </span>

                                {theme === id && <FaCheck className="h-4 w-4 text-blue-600 dark:text-blue-300" />}
                            </button>
                        ))}
                    </div>
                )}
            </PopoverPanel>
        </Popover>
    )
}
