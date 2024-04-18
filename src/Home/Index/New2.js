import { React, useState, useContext, useEffect } from 'react'
// 頁面串接
import Newspage from './Newspage'
import { themeforbutton } from './Appbar';
import { TakePostcontext, TakePostProvider } from './AllApi/IndexAPI'
// mui
import { IconButton, Stack, Grid, Typography, ThemeProvider, CardContent, Badge, Button, Modal, CardActions, CardMedia, Card, Box } from '@mui/material'
// 圖片(icon)
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
// 後面加的
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { CategoryContext } from './CategoryContext';

function New2() {
    return (
        <TakePostProvider>
            <New3 />
        </TakePostProvider>
    )
}

export function New3() {

    // 從最大的爸爸拿到的資料
    const {
        category, selectedTab,//篩選判斷用
        searchref,//搜索用
        isUserLoggedIn, setIsUserLoggedIn, checkLoginStatus, //判斷登入
        postbook, setPostBook,//用來排序的的資料
        postQuantity, postclick,//設定載入文章數量
        formatDate,//po文時間的轉換
        // 喜歡按鈕
        loveStates, setLoveStates,
        likeCounts, setLikeCounts,
        // 不喜歡按鈕
        hateStates, setHateStates,
        dislikeCounts, setDislikeCounts,
        // 下面是函數
        fetchPostBook,// 關於搜索以及排序，判斷是否按讚
        toggleLove,//點讚的登入才能使用此功能
        toggleHate,//倒讚的登入才能使用此功能

    } = useContext(CategoryContext);
    const search = searchref


    // 從第二個爸爸拿到資料
    const { setpagedata,//切換首頁分類標籤
        handleWidUpdate, collect, //收藏會用到
    } = useContext(TakePostcontext)


    // 網頁剛載入會執行的部分
    useEffect(() => {
        checkLoginStatus();
        fetchPostBook();
    }, [isUserLoggedIn, selectedTab, category, search]);



    //  內嵌式網頁
    const [pageopen, setpageopen] = useState(false)
    const onpenpage = (prop) => {
        setpageopen(true)
        setpagedata(prop)
    }


    const closepage = () => setpageopen(false)
    return (
        <>
            <Modal open={pageopen} onClose={closepage}><Newspage closepage={closepage} /></Modal>


            {postbook.slice(0, postQuantity).map((bookdata, index) => (<div key={index}>
                <Grid item key={bookdata.WID}>
                    <Card sx={{ width: 250, height: 480, m: 3 }} key={bookdata.WID}>
                        {/* 圖 */}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button sx={{ height: 1 }} onClick={() => {
                                onpenpage(bookdata.WID);
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{ objectFit: 'contain', width: 200, height: 200 }}
                                    image={bookdata.ItemIMG ? `data:image/jpeg;base64,${bookdata.ItemIMG}` : '../dd.jpg'}
                                />
                            </Button>
                        </Box>
                        {/* 內容 */}
                        <CardContent sx={{ height: 150 }}>
                            <Stack direction='row' spacing={2} >
                                <Typography variant="subtitle1" sx={{ color: 'red' }}>{bookdata.product_tag}</Typography>
                                <Typography variant="subtitle1" sx={{ color: 'red' }}>{bookdata.location_tag}</Typography>
                            </Stack>

                            <Typography variant="h6" >
                                {bookdata.Title.length > 10 ? `${bookdata.Title.slice(0, 10)}...` : bookdata.Title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {bookdata.Article.length > 80 ? `${bookdata.Article.slice(0, 50)}...` : bookdata.Article}
                            </Typography>
                        </CardContent>
                        {/* 按鈕 */}
                        <CardActions sx={{}}>
                            <Stack direction='row' spacing={1} >
                                {/* 折扣 */}
                                <IconButton disabled >
                                    <Badge badgeContent={''} color="error" sx={{ position: 'absolute', right: -1, top: 6 }}>
                                    </Badge>
                                    <Typography sx={{ color: '#f44336' }}>折扣狀態</Typography>
                                </IconButton>
                                {/* 愛心 */}
                                <IconButton onClick={() => toggleLove(bookdata.WID)} >
                                    <Badge badgeContent={likeCounts[bookdata.WID]} color="error" showZero={true}>
                                        <FavoriteIcon sx={{ ':hover': { color: '#d50000' }, color: loveStates[bookdata.WID] ? '#d50000' : '#616161' }} />
                                    </Badge>
                                </IconButton>
                                {/* 不喜歡 */}
                                <IconButton onClick={() => toggleHate(bookdata.WID)} >
                                    <Badge badgeContent={dislikeCounts[bookdata.WID]} color="error" showZero={true}>
                                        <ThumbDownIcon sx={{ ':hover': { color: '#616161' }, color: hateStates[bookdata.WID] ? '#00AEAE' : '#616161' }} />
                                    </Badge>
                                </IconButton>
                                {/* 收藏 */}
                                {/* <IconButton onClick={() => handleWidUpdate()} >
                                <BookmarkOutlinedIcon sx={{ ':hover': { color: '#ffc107' }, color: collect.isFavorited ? '#ffc107' : '#616161' }} />
                                {console.log(collect.isFavorited)}
                            </IconButton> */}
                                {/* 分享 */}
                                <IconButton>
                                    <SendSharpIcon sx={{ ':hover': { color: '#0277bd' } }} />
                                </IconButton>
                            </Stack>

                        </CardActions>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            發文日期 : {formatDate(bookdata.PostTime)}
                        </Typography>
                    </Card>
                </Grid>
            </div>


            ))}

            {/* 按一下新增10篇文章 */}
            <ThemeProvider theme={themeforbutton}>
                {postbook.length > 0 ?
                    <Grid container my={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={postclick} sx={{ width: 100 }}>
                            加載更多
                        </Button>
                    </Grid>
                    :
                    <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>目前沒有文章</Typography>
                }
            </ThemeProvider>
        </>
    )
}
export default New2