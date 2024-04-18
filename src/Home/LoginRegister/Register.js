import React, { useRef, useEffect, useState } from 'react';
import { InserttoSql } from './AixosLR';
import { Link, NavLink } from 'react-router-dom';
import Appbar,{themeforbutton} from '../Index/Appbar';
import axios from "axios";


import { CssBaseline, Box, Typography, Grid, Fab, Paper, TextField, CardMedia, Divider, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 驗證碼頁面 -------------------------------- 



function Register2() {
    const dataemail = useRef();
    const dataname = useRef();
    const datapassword = useRef();
    const rvdata = useRef();

    // 信箱驗證點擊 --------------------------------

    useEffect(() => {
        // 獲取 URL 查詢參數中的驗證郵箱
        const Url = new URLSearchParams(window.location.search);
        const verifiedEmail = Url.get("email");

        // 如果存在驗證郵箱，則發送 POST 請求到後端
        if (verifiedEmail) {
            emailToPHP(verifiedEmail);
        }
    }, []);

    const emailToPHP = (email) => {
        axios({
            url: "http://localhost/Prologin2/public/api/email",
            method: "post",
            data: {
                email: email,
            }
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    // 驗證碼
    const [captchaImageUrl, setCaptchaImageUrl] = useState('');
    useEffect(() => {
        // 呼叫 API 以獲取驗證碼圖片
        captchaGetImageToPHP();
    }, []);
    const captchaGetImageToPHP = () => {
        axios({
            url: "http://localhost/Prologin2/public/api/reload-captcha",
            method: "get",
        })
            .then(function (response) {
                // console.log(response.date);
                const imgSrc = response.data.captcha;
                // console.log(imgSrc);

                // 使用正則表達式來擷取 src 屬性中的 URL
                const regex = /src="([^"]+)"/;
                const match = imgSrc.match(regex);
                // console.log(match);
                if (match && match.length > 1) {
                    const imageUrl = match[1];
                    setCaptchaImageUrl(imageUrl);
                    // console.log(imageUrl);
                }

                // console.log(response.data.captcha);
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    return (
        <>
            <Appbar />
            <ThemeProvider theme={themeforbutton}>
                <Grid container sx={{ width: 0.6, height: 0.7, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                    <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <CardMedia
                            component='img'
                            image='../LRimg.png'
                            sx={{ objectFit: 'contain', justifyContent: 'center' }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} p={8} sx={{ bgcolor: 'white', borderRadius: 1, boxShadow: 10 }}>
                        <Stack spacing={2}>
                            <Typography variant='h5'>註冊</Typography>
                            <Typography variant='subtitle2'>有帳號了嗎?<NavLink to='/login'> 點我登入</NavLink> </Typography>

                            <Divider />
                            {/* <Typography variant='subtitle1' align='lift'>帳號</Typography> */}
                            <TextField sx={{ my: 1, width: 1 }} variant="filled" name='email' inputRef={dataemail} type='email' label="信箱" />

                            {/* <Typography variant='subtitle1' align='lift'>使用者名稱</Typography> */}
                            <TextField sx={{ my: 1, width: 1 }} variant="filled" name='name' inputRef={dataname} type='text' label="名稱" />

                            {/* <Typography variant='subtitle1' align='lift'>密碼</Typography> */}
                            <TextField sx={{ my: 1, width: 1 }} variant="filled" name='password' inputRef={datapassword} type='password' label="密碼" />
                            <TextField variant="filled" type="text" inputRef={rvdata} label="驗證碼" />
                            <Stack spacing={2} direction='row'>
                                <img src={captchaImageUrl} id='abc' />
                                <Button onClick={captchaGetImageToPHP}>重新載入驗證碼</Button>
                            </Stack>
                            <Grid container m={10} sx={{ justifyContent: 'center' }}>
                                <Button variant='contained' sx={{bgcolor:'#ffbcbc'}} onClick={() => InserttoSql(dataemail, dataname, datapassword, rvdata)}>登入</Button>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default Register2