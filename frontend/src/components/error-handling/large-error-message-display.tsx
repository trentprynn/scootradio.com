import { DisplayError } from '@/utils/functions/error-handling'
import { MdErrorOutline } from 'react-icons/md'

export function LargeErrorMessageDisplay({ displayError }: { displayError: DisplayError }) {
    const { title, message } = displayError
    return (
        <div className="flex h-[32rem] flex-col items-center justify-center px-4 py-12 text-center">
            <MdErrorOutline className="mb-4 h-16 w-16 text-red-500" />
            <h1 className="text-xl font-semibold text-red-600">{title}</h1>
            {message && <p className="mt-2 max-w-lg text-base text-gray-700">{message}</p>}
        </div>
    )
}
