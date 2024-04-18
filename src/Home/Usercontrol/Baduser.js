import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse, IconButton, List, ListItemButton, ListItemIcon, ListSubheader, Paper, Stack, Typography } from '@mui/material'
import { React, useState } from 'react'

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const iddata = [
    { id: 1, name: 'ken' },
    { id: 2, name: 'iris' },
    { id: 3, name: 'kevin' },
]


function Baduser() {


    return (
        <List sx={{ width: 1, }}
            component='nav'
            subheader={
                <ListSubheader component='div'><Typography variant='h5' mb={2} sx={{ textAlign: 'center' }}>違規會員帳號</Typography></ListSubheader>
            }
        >
            <Paper sx={{bgcolor:'#eeeeee'}}>
                {iddata.map((propss) => {
                    return (
                        <ListItemButton key={propss.id} container sx={{ justifyContent: 'space-between' }} >
                            <Typography variant='subtitle2'>{propss.id}</Typography>
                            <Typography variant='subtitle2'>{propss.name}</Typography>
                            <MdKeyboardDoubleArrowRight />
                        </ListItemButton>
                    )
                })}
            </Paper>

        </List>
    )
}

export default Baduser