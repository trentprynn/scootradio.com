import { StandardPageWrapper } from '@/components/layout/standard-page-wrapper'
import Link from 'next/link'

export default function NotFound() {
    return (
        <StandardPageWrapper>
            <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col justify-center px-4">
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">404 / not found</p>
                <h1 className="mt-6 text-5xl font-semibold text-gray-900 sm:text-6xl dark:text-gray-100">
                    page not found
                </h1>
                <div className="mt-6 max-w-md">
                    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                        The requested page may have moved, or the address may have been entered incorrectly.
                    </p>
                </div>

                <Link
                    href="/"
                    className="mt-8 w-fit border-b border-gray-500 pb-1 text-sm font-medium text-gray-900 hover:border-emerald-500 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-300"
                >
                    return home
                </Link>
            </div>
        </StandardPageWrapper>
    )
}
