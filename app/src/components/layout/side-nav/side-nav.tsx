import HomeIcon from '@mui/icons-material/Home'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'

import PlumbingIcon from '@mui/icons-material/Plumbing'

export default function SideNav() {
    return (
        <Box sx={{ overflow: 'auto', marginTop: '48px' }}>
            <List disablePadding>
                <Link href="dashboard" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Divider />
                <Link href="debug" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PlumbingIcon />
                            </ListItemIcon>
                            <ListItemText>Debug</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Divider />
            </List>
        </Box>
    )
}
