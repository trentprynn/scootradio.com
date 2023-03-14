import { useNewLocalSettings } from '@/state/local/use-new-local-settings'
import { useAuth0 } from '@auth0/auth0-react'
import { AppBar, Drawer } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import NavBar from './nav-bar/nav-bar'
import SideNav from './side-nav/side-nav'

export default function Layout({ children, title = 'ScootRadio' }: { children: any; title?: string }) {
    const router = useRouter()

    const newLocalSettings = useNewLocalSettings((state) => state)

    const { user } = useAuth0()

    const { ref, width } = useResizeDetector()

    useEffect(() => {
        if (width) {
            // we only want to update the local settings if the width has changed so components only
            // re-render when appropriate
            if (!newLocalSettings.viewPortSizeInstantiated || newLocalSettings.mobile !== width < 900) {
                let modifiedSettings = Object.assign({}, newLocalSettings)

                modifiedSettings.viewPortSizeInstantiated = true
                modifiedSettings.mobile = width < 900

                newLocalSettings.updateSettings(modifiedSettings)
            }
        }
    }, [newLocalSettings, width])

    const toggleDrawer = (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        let newModifiedSettings = Object.assign({}, newLocalSettings)
        newModifiedSettings.mobileSideNavExpanded = state

        newLocalSettings.updateSettings(newModifiedSettings)
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <AppBar ref={ref} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 0 }}>
                <NavBar></NavBar>
            </AppBar>

            {newLocalSettings.viewPortSizeInstantiated && (
                <Box sx={{ display: 'flex' }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    {user && (
                        <Drawer
                            variant={newLocalSettings.mobile ? 'temporary' : 'permanent'}
                            open={newLocalSettings.mobileSideNavExpanded}
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
