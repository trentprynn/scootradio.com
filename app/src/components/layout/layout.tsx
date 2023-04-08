import { useLocalSettings } from '@/state/local/use-new-local-settings'
import { useAuth0 } from '@auth0/auth0-react'
import { AppBar, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NavBar from './nav-bar/nav-bar'
import SideNav from './side-nav/side-nav'

export default function Layout({ children, title = 'ScootRadio' }: { children: any; title?: string }) {
    const router = useRouter()

    const localSettings = useLocalSettings((state) => state)

    const { user } = useAuth0()

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        if (!localSettings.viewPortSizeInstantiated) {
            localSettings.setViewPortSizeInstantiated(true)
        }

        if (localSettings.mobile !== isSmallScreen) {
            localSettings.setMobile(isSmallScreen)
        }
    }, [localSettings, isSmallScreen])

    const toggleDrawer = (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        localSettings.setMobileSideNavExpanded(false)
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 0 }}>
                <NavBar></NavBar>
            </AppBar>

            {localSettings.viewPortSizeInstantiated && (
                <Box sx={{ display: 'flex' }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    {user && (
                        <Drawer
                            variant={localSettings.mobile ? 'temporary' : 'permanent'}
                            open={localSettings.mobileSideNavExpanded}
                            sx={{
                                width: '240px',
                                flexShrink: 0,
                                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                            }}
                        >
                            <SideNav></SideNav>
                        </Drawer>
                    )}

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            width: '100%',
                            overflowX: 'hidden',
                            marginTop: '48px',
                            paddingTop: '15px',
                            height: 'calc( 100vh - 70px)',
                            overflowY: 'auto',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            )}
        </>
    )
}
