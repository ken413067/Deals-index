import {
    TextField, Avatar, createTheme, ThemeProvider, Box, Divider, Grid, Stack,
    Typography, Paper, IconButton, Card, CardContent, CardMedia, Badge, Button, Modal, Fab
} from '@mui/material'

import { React, useState, useContext } from 'react'
import { AboutmeContext } from './AbRouter';


import FavoriteIcon from '@mui/icons-material/Favorite';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

import { Shareicon } from '../Index/Tools'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// 表情包
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';



export function AboutPost() {
    return (
        <>
            <Grid item xs={9} p={4} sx={{ bgcolor: 'white', height: 1 }}>
                <Stack spacing={2} sx={{ width: 1, height: 1 }}>
                    <Typography variant='h5'>我的文章<Divider /></Typography>
                    <Grid container sx={{ overflowY: 'scroll' }}>
                        <Grid item xs={11}>
                            <Paper spacing={2} sx={{ p: 2, width: 1 }}>
                                <Abmypost />
                            </Paper>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </>
    )
}


export function Abmypost() {
    // 接收下文
    const { data, setSelectedArticle, setnewspagedata } = useContext(AboutmeContext);
    const dataforcollect = data && data[3] ? data[3] : "預設值為空";
    const dataforcollect1 = data[3];



    // console.log(dataforcollect)
    // console.log(dataforpost)


    // 內嵌式網頁
    const [pageopen, setpageopen] = useState(false)
    // 點擊圖片時把文章的wid傳入內嵌網頁
    const onpenpage = (articlewid) => {
        setpageopen(true)
        setSelectedArticle(articlewid)
        setnewspagedata(dataforcollect1)

    }
    // console.log(newspagedata)

    const closepage = () => setpageopen(false)

    // 愛心按鈕
    const [love, setlove] = useState(true)
    const loverclick = () => (
        setlove(!love)
    )
    // 收藏按鈕
    const [collect, setcollect] = useState(true)
    const collectclick = () => (
        setcollect(!collect)
    )

    return (
        <>
            <Modal open={pageopen} onClose={closepage}><Newspageforcollect /></Modal>
            {dataforcollect.length>0 ?
                dataforcollect.map((prop, index) => (
                    <Card sx={{ mb: 2 }} key={index}>
                        <Grid container sx={{ p: 0.5, m: 1, height: '15vh', gap: 1, flexWrap: 'nowrap' }}>

                            <Grid item xs={4} md={3}>
                                <Button sx={{ height: 1 }} onClick={() => onpenpage(prop.WID)}>
                                    <CardMedia
                                        component="img"
                                        sx={{ objectFit: 'contain', maxHeight: 1, maxWidth: '30vh' }}
                                        image="../dd.jpg"
                                    />
                                </Button>
                            </Grid>


                            <Grid item xs={8} md={9} sx={{ width: 1, maxHeight: 1 }}>
                                <CardContent sx={{ width: 0.9, height: '20vh' }}>
                                    <Stack spacing={1} sx={{ justifyContent: 'start', height: 1, whiteSpace: 'nowrap' }}>
                                        <Stack direction='row' spacing={2} sx={{ justifyContent: 'start', height: 0.15 }}>
                                            <Typography>{prop.location_tag ? prop.location_tag : ''}</Typography>
                                            <Typography>{prop.product_tag ? prop.product_tag : ''}</Typography>
                                            <Typography>{prop.Title ? prop.Title : 0}</Typography>
                                        </Stack>
                                        <Stack sx={{ bgcolor: 'red', height: 0.45, width: 1 }}>
                                            <Typography variant="subtitle1" sx={{ textOverflow: 'line-break', overflow: 'hidden', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{prop.Article}</Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Grid>

                        </Grid>
                        <Grid container sx={{ bgcolor: '#efefef', justifyContent: 'start', gap: 3, p: 1 }}>
                            <Grid item>
                                {/* 折扣 */}
                                <IconButton disabled={true} >
                                    <Badge badgeContent={prop.InProgress ? prop.InProgress : ''} color="error" sx={{ position: 'absolute', right: -1, top: 6 }}>

                                    </Badge>
                                    <Typography sx={{ color: '#f44336' }}>OFF</Typography>
                                </IconButton>
                                {/* 愛心 */}
                                <IconButton onClick={loverclick} sx={{ ':hover': { color: '#d50000' } }}>
                                    <Badge badgeContent={prop.GiveLike ? prop.GiveLike : ''} color="error">
                                        <FavoriteIcon sx={{ color: love ? '#616161' : '#d50000' }} />
                                    </Badge>
                                </IconButton>
                                {/* 收藏 */}
                                <IconButton onClick={collectclick} sx={{ ':hover': { color: '#ffc107' } }}>
                                    <BookmarkOutlinedIcon sx={{ color: collect ? '#616161' : '#ffc107' }} />
                                </IconButton>
                                {/* 分享 */}
                                <IconButton>
                                    <SendSharpIcon sx={{ ':hover': { color: '#0277bd' } }} />
                                </IconButton>
                            </Grid>
                        </Grid>



                    </Card>


                ))
                :
                <Typography>目前沒有發文</Typography>
            }

        </>
    )
}





function Newspageforcollect() {

    // 接收下文
    const { selectedArticle, newspagedata, aboutmemsg } = useContext(AboutmeContext);
    // console.log(aboutmemsg)

    const article = newspagedata.find((article) => article.WID == selectedArticle);
    if (!article) {
        return <div>加載失敗</div>
    }


    return (
        <>

            {/* 主容器 */}

            <Box sx={{
                width: 800, height: 900, bgcolor: '#ffffff',
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflowY: 'scroll'
            }}>
                {/* 會員名稱及標題 */}
                <Paper sx={{ width: 1, position: 'sticky', top: 0, zIndex: 1 }}>
                    <Stack direction='row' sx={{ height: 40, p: 2, alignItems: 'center', justifyContent: 'space-between', }}>
                        <Stack direction='row' spacing={2}>
                            <Typography variant='h6'>{article.location_tag ? article.location_tag : ''}</Typography>
                            <Typography variant='h6'>{article.location_tag ? article.location_tag : ''}</Typography>
                            <Typography variant='h6'>{article.Title ? article.Title : ''}</Typography>
                        </Stack>
                        <IconButton >
                            <CloseOutlinedIcon />
                        </IconButton>

                    </Stack>
                </Paper>
                <Paper sx={{ width: 751, m: 1, p: 1 }}>






                    {/* 小容器-2 */}
                    <Stack spacing={1} sx={{ height: 1, p: 1 }}>

                        {/* 會員標籤 */}
                        <Stack direction='row' spacing={3} sx={{ height: 30, alignItems: 'center', justifyContent: 'space-between', p: 1, }}>
                            <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                                <Avatar src='./ken1.jpg' sx={{ height: 46, width: 46, border: 1 }} />
                                <Typography color='error'>{article.UID ? article.UID : ''}</Typography>
                            </Stack>
                            <IconButton >
                                <ReportProblemIcon />
                            </IconButton>

                        </Stack>
                        <Typography variant='subtitle2' sx={{ p: 1, alignItems: 'center' }}>{article.PostTime ? article.PostTime : ''}</Typography>
                        <Divider />

                        {/* 會員內容 */}
                        <Stack sx={{ height: 'auto', p: 3 }}>
                            <CardMedia
                                component="img"
                                sx={{ objectFit: 'contain', maxHeight: '30vh', maxWidth: 1, mb: 3 }}
                                image="./homebgground.jpg"
                            />
                            <Typography variant='subtitle1' >
                                {article.Article ? article.Article : ''}
                            </Typography>

                        </Stack>

                        {/* 優惠時間(開始結束) */}
                        <Stack direction='row' sx={{ height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                            <Typography variant='subtitle1'>{article.ConcessionStart ? article.ConcessionStart : ''}</Typography>
                            <Typography variant='subtitle1'>~</Typography>
                            <Typography variant='subtitle1'>{article.ConcessionEnd ? article.ConcessionEnd : ''}</Typography>

                        </Stack>
                        <Divider />
                        {/* 廣告 */}
                        <Stack sx={{ height: 120, }}>
                            <CardMedia
                                component="img"
                                sx={{ objectFit: 'cover', maxHeight: 1, Width: 1 }}
                                image="./advertise.jpg"
                            />
                        </Stack>
                        {/* 推薦文章 */}
                        <Stack sx={{ height: 'auto' }}>
                            <Typography>推薦文章</Typography>
                            <Divider />

                            <Grid container m={2} >
                                <Grid item xs={6} >
                                    <Push />
                                    <Push />
                                </Grid>
                                <Grid item xs={6} >
                                    <Push />
                                    <Push />
                                </Grid>
                            </Grid>


                        </Stack>
                        {/* 留言 */}
                        <Stack sx={{ height: 'auto' }}>
                            <Typography>留言</Typography>
                            <Divider />
                            <Message />

                        </Stack>
                    </Stack>



                </Paper>
                {/* 案讚訂閱分享 */}
                <Stack direction='row' sx={{ height: 50, position: 'sticky', alignItems: 'center', justifyContent: 'center', bottom: 0, p: 1, }}>
                    <Avatar src='./ken1.jpg' sx={{ height: 46, width: 46, border: 1 }} />
                    <TextField sx={{ mx: 4, height: 1, width: 0.5 }} borderradius='3' variant="outlined" size='small' type='text' label="留言....." />
                    <Stack direction='row' spacing={2}>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton>
                            <SentimentVeryDissatisfiedIcon />
                        </IconButton>
                        <IconButton>
                            <BookmarkOutlinedIcon />
                        </IconButton>


                    </Stack>
                    <Box sx={{ position: 'absolute', bottom: '-17px', right: '10px' }}>
                        <Shareicon />
                    </Box>
                </Stack>
            </Box>
            {/* ))} */}




        </>
    )
}
// 推薦文章
function Push() {


    return (
        <Grid container>
            <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                    <CardMedia
                        component="img"
                        sx={{ objectFit: "cover", height: 80, width: 80, borderradius: 3 }}
                        image="./yoyo.jpg"
                    />
                    <Typography variant="subtitle2">文章標題</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}


// 留言
function Message() {
    // 接收下文
    const { selectedArticle, aboutmemsg } = useContext(AboutmeContext);
    const postMsg = aboutmemsg[1]

    const article = postMsg.find((article) => article.WID == selectedArticle);

    if (!article) {
        return <div>加載失敗</div>
    }
    return (
        <>

            <Stack m={2} spacing={2}>
                <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                    <Avatar src='./ken1.jpg' sx={{ height: 46, width: 46, border: 1 }} />
                    <Typography color='error' variant='subtitle2'>{article.UID ? article.UID : ''}</Typography>
                </Stack>

                <Stack >
                    <Typography variant='subtitle1'>{article.MSGPost ? article.MSGPost : ''}</Typography>
                    {/* <Typography variant='subtitle2' color='#757575' sx={{ textDecoration: 'underline' }}>顯示回復留言</Typography> */}
                    <Typography variant='subtitle2'>{article.MSGPostTime ? article.MSGPostTime : ''}</Typography>
                </Stack>
                <Divider />
            </Stack>
            {/* </div> */}
            {/* ))} */}
        </>
    )

}

export default AboutPost