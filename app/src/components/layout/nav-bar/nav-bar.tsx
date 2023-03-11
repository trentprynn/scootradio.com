import useEphemeralLocalSettings from '@/data/state/local/settings/use-local-settings'
import { useUser } from '@auth0/nextjs-auth0/client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, IconButton, Popover, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    const { localSettings, setLocalSettings } = useEphemeralLocalSettings()

    const { user, error, isLoading } = useUser()

    const toggleSideNav = () => {
        console.log('TOGGLING SIDE NAV')

        let modifiedSettings = Object.assign({}, localSettings)
        modifiedSettings.mobileSideNavExpanded = !localSettings.mobileSideNavExpanded

        console.log(`${localSettings.mobileSideNavExpanded} -> ${modifiedSettings.mobileSideNavExpanded}`)

        setLocalSettings(modifiedSettings)
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <Toolbar variant="dense">
            {user && localSettings.mobile && (
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
                    <IconButton color="default" aria-describedby="profile-popover" onClick={handleClick}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Popover
                        id="profile-popover"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>{user.email}</Typography>
                        <Box textAlign="center" sx={{ mb: 1 }}>
                            <Button variant="contained" disableElevation size="small" href="/api/auth/logout">
                                Logout
                            </Button>
                        </Box>
                    </Popover>
                </div>
            )}
        </Toolbar>
    )
}
