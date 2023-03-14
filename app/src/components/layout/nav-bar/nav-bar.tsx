import { useNewLocalSettings } from '@/state/local/use-new-local-settings'
import { useAuth0 } from '@auth0/auth0-react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, IconButton, Popover, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    const newLocalSettings = useNewLocalSettings((state) => state)

    const { user, logout } = useAuth0()

    const toggleSideNav = () => {
        console.log('TOGGLING SIDE NAV')

        let newModifiedSettings = Object.assign({}, newLocalSettings)

        newModifiedSettings.mobileSideNavExpanded = !newModifiedSettings.mobileSideNavExpanded

        newLocalSettings.updateSettings(newModifiedSettings)
    }

    const [profilePopoverElement, setProfilePopoverElement] = React.useState<HTMLButtonElement | null>(null)

    const handleProfileButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfilePopoverElement(event.currentTarget)
    }

    const handleProfilePopoverClose = () => {
        setProfilePopoverElement(null)
    }

    const profilePopoverOpen = Boolean(profilePopoverElement)

    return (
        <Toolbar variant="dense">
            {user && newLocalSettings.mobile && (
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => toggleSideNav()}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ height: '40px', width: '40px' }}>
                    <Link href={user ? '/dashboard' : '/'} passHref>
                        <Image
                            className="img-fluid"
                            loading="lazy"
                            height={512}
                            width={512}
                            src="/logo192.png"
                            alt="scoot radio logo"
                        ></Image>
                    </Link>
                </Box>
            </Box>

            {user && (
                <div>
                    <IconButton color="default" aria-describedby="profile-popover" onClick={handleProfileButtonClick}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Popover
                        id="profile-popover"
                        open={profilePopoverOpen}
                        anchorEl={profilePopoverElement}
                        onClose={handleProfilePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>{user.email}</Typography>
                        <Box textAlign="center" sx={{ mb: 1 }}>
                            <Button
                                variant="contained"
                                disableElevation
                                size="small"
                                type="button"
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Popover>
                </div>
            )}
        </Toolbar>
    )
}
