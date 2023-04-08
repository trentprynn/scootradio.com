import { EphemeralLocalSettings } from '@/types/settings/ephemeral-local-settings.type'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialSettings: EphemeralLocalSettings = {
    mobile: false,
    mobileSideNavExpanded: false,
    viewPortSizeInstantiated: false,
}

export const useLocalSettings = create(
    combine(initialSettings, (replace) => ({
        setMobile: (to: boolean) => replace({ mobile: to }),
        setMobileSideNavExpanded: (to: boolean) => replace({ mobileSideNavExpanded: to }),
        setViewPortSizeInstantiated: (to: boolean) => replace({ viewPortSizeInstantiated: to }),
    }))
)
