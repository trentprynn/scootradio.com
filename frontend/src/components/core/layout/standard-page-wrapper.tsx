export function StandardPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <div className="p-4">{children}</div>
        </main>
    )
}
