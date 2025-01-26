'use client'

import { StandardPageWrapper } from '@/components/layout/standard-page-wrapper'
import { RadioStationList } from '@/components/radio-station/radio-station-list/radio-station-list'

export default function Home() {
    return (
        <StandardPageWrapper>
            <RadioStationList />
        </StandardPageWrapper>
    )
}
