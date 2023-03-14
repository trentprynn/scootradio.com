import { EphemeralLocalSettings } from '@/types/settings/ephemeral-local-settings.type'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialSettings: EphemeralLocalSettings = {
    mobile: false,
    mobileSideNavExpanded: false,
    viewPortSizeInstantiated: false,
}

export const useNewLocalSettings = create(
    combine(initialSettings, (replace) => ({
        updateSettings: (to: EphemeralLocalSettings) => replace(to),
    }))
)
