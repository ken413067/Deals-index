import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import AboutMaterial from './AbMeee'

// 創建上文
export const AboutmeContext = createContext();

// axios接資料(關於我)
export const AboutmeProvider = ({ children }) => {
    // 關於我全部的資料
    const [data, setData] = useState(null);
    // 文章資料
    const [newspagedata,setnewspagedata] = useState(null)
    // 文章的WID
    const [selectedArticle, setSelectedArticle] = useState(null)
    
    // 網頁加載完時渲染關於我及部分文章資料
    useEffect(() => {
        axios({
            url: 'http://localhost/Prologin2/public/api/aboutme',
            method: 'post',
            data: {
                token: Cookies.get('token'),
            },
        })
            .then(function (response) {
                const aboutdata = Object.values(response.data)
                setData(aboutdata[2][0].PersonalProfile);
                console.log(aboutdata)
            })
            .catch(function (error) {
                console.log('失敗');
            });
    }, []);
    // console.log(data)
    // 網頁加載完時渲染關於我留言資料
    const [aboutmemsg,setaboutmemsg] = useState(null)
    useEffect(() => {
        axios({
            url: 'http://localhost/Prologin2/public/api/post',
            method: 'post',
            data: {
                token: Cookies.get('token'),
            },
        })
            .then(function (response) {
                const aboutpostmsg = Object.values(response.data)
                setaboutmemsg(aboutpostmsg);
                
            })
            .catch(function (error) {
                console.log('失敗');
            });
    }, []);
                    // console.log(aboutmemsg)

    // 把所有的狀態都塞進去
    const allvalue = {
        data, 
        setData,
        selectedArticle, 
        setSelectedArticle,
        newspagedata,
        setnewspagedata,
        aboutmemsg,
        setaboutmemsg
    }



    // console.log(aboutmemsg)
    //   提供上文資料
    return (
        <AboutmeContext.Provider value={allvalue}>
            {children}
        </AboutmeContext.Provider>
    );
};

export function Abupdate (sqlforname,sqlforpassword,sqlforme,image){
    const toname = sqlforname.current.value;
    // const toemail = sqlforemail.current.value;
    const topassword = sqlforpassword.current.value;
    const toPersonalProfile = sqlforme.current.value;
    // console.log(topassword)
    axios({
        url: 'http://localhost/Prologin2/public/api/update',
        method: 'post',
        data: {
            name:toname,
            // email:toemail,
            password:topassword,
            PersonalProfile:toPersonalProfile,
            // image:image,
            token: Cookies.get('token'),
        },
    })
        .then(function (response) {
            console.log("傳送成功")
        })
        .catch(function (error) {
            console.log('傳送失敗');
        });
    // axios({
    //     url: 'http://localhost/Prologin2/public/api/personalprofile',
    //     method: 'post',
    //     data: {
    //         token: Cookies.get('token'),
    //         PersonalProfile:toPersonalProfile,
    //     },
    // })
    //     .then(function (response) {
    //         console.log("傳送成功1")
    //     })
    //     .catch(function (error) {
    //         console.log('傳送失敗1');
    //         console.log(toPersonalProfile);
    //     });
}