export type PaddedErrorMessageDisplayProps = {
    title: string
    description?: string
}

export function PaddedErrorMessageDisplay({ title, description }: PaddedErrorMessageDisplayProps) {
    return <div>{description && <p>{description}</p>}</div>
}
