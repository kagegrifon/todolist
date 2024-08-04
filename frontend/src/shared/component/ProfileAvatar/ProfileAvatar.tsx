import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

import { stringToColor } from 'shared/util'
import Tooltip from '@mui/material/Tooltip'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material'

const profileSettings = ['Logout'] as const

type Props = {
    userName: { lastName?: string; firstName: string }
    onLogout: () => void
}

export const ProfileAvatar = (props: Props) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const onLogoutClick = () => {
        handleCloseUserMenu()
        props.onLogout()
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(props.userName)} />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {profileSettings.map(
                    (setting) =>
                        setting === 'Logout' && (
                            <MenuItem key={setting} onClick={onLogoutClick}>
                                <ListItemIcon>
                                    <Logout fontSize='small' />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        ),
                )}
            </Menu>
        </Box>
    )
}

function stringAvatar({ lastName = '', firstName }: { lastName?: string; firstName: string }) {
    return {
        sx: {
            bgcolor: stringToColor(lastName + firstName),
        },
        children: lastName ? `${firstName} ${lastName}` : `${firstName[0]}${firstName[1]}`,
    }
}
