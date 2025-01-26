import { MdErrorOutline } from 'react-icons/md'
import { StandardPageWrapper } from '../layout/standard-page-wrapper'

export type FullPageErrorIndicatorProps = {
    title: string
    description?: string
}

export function FullPageErrorIndicator({ title, description }: FullPageErrorIndicatorProps) {
    return (
        <StandardPageWrapper>
            <div className="flex h-full flex-col items-center justify-center px-4 py-12 text-center">
                <MdErrorOutline className="mb-4 h-16 w-16 text-red-500" />

                <h1 className="text-xl font-semibold text-red-600">{title}</h1>

                {description && <p className="mt-2 max-w-lg text-base text-gray-700">{description}</p>}
            </div>
        </StandardPageWrapper>
    )
}
