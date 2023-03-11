import { EphemeralLocalSettings } from '@/types/settings/ephemeral-local-settings.type'
import useStore from 'swr-global-state'

const KEY = '@app/local-settings'

function useEphemeralLocalSettings() {
    const [localSettings, setLocalSettings] = useStore<EphemeralLocalSettings>({
        key: KEY,
        initial: {
            mobile: false,
            mobileSideNavExpanded: false,
            viewPortSizeInstantiated: false,
        },
    })

    return {
        localSettings,
        setLocalSettings,
    }
}

export default useEphemeralLocalSettings
