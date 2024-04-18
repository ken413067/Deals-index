import { React, useState } from 'react'
import Baduser from './Baduser'
import New2 from '../Index/New2'
import Appbar from '../Index/Appbar';


import { Box, Grid, Paper, Stack, Typography } from '@mui/material'



function Controller() {

  return (
    <>
      {/* <Appbar /> */}
        <Stack container direction={'row'} p={3} spacing={0.2} sx={{ justifyContent: 'center' ,mt:15}}>
          <Grid sx={{ width: 500, height: 650, bgcolor: 'white', p: 3 }}>
            <Stack m={2} sx={{ height: 0.85 }}>
              <Baduser />
            </Stack>
          </Grid>
          <Grid sx={{ width: 850, height: 650, bgcolor: 'white', p: 3, overflowY: 'scroll' }}>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>違規文章</Typography>
            {/* 這邊要放文章 */}
          </Grid>
        </Stack>
    </>
  )
}

export default Controller