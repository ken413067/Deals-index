import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState, useRef } from "react";
import { Stack, Button, TextField } from '@mui/material'
import Register2 from './Register'
// import Tttt from './OtherPage'
// import Aboutmecontext from './Aboutmecontext'

function InserttoSql(dataemail, dataname, datapassword,rvdata) {

    const email = dataemail.current.value;
    const name = dataname.current.value;
    const password = datapassword.current.value;
    const RV = rvdata.current.value
// console.log(Cookies.get("captcha"))
    axios({
        url: "http://localhost/Prologin2/public/api/register",
        method: "post",
        data: {
            email: email,
            name: name,
            password: password,
            captcha: Cookies.get("captcha"),
            rv: RV
        }
    })
        .then(function (response) {
            console.log(response.data);
            console.log("註冊成功");
            // console.log(password)



        })
        .catch(function (error) {
            console.log("註冊失敗");
            // console.log(name)


        });
}

function LoginFromSql(dataemail, datapassword,rvdata) {
    const email = dataemail.current.value;
    const password = datapassword.current.value;
    const RV = rvdata.current.value
// console.log(RV)

    axios({
        url: "http://localhost/Prologin2/public/api/login",
        method: "post",
        data: {
            email: email,
            password: password,
            captcha: Cookies.get("captcha"),
            rv:RV,
        }
    })
        .then(function (response) {
            console.log(response.data);
            console.log('登入成功1');
            // console.log(password);
            Cookies.set("token", response.data.authorization.token)
        })
        .catch(function (error) {
            console.log("密碼/使用者帳號輸入錯誤");
            // console.log(email);
            // console.log(password);
        });
}
// 驗證圖片
// export function CaptchaGetImageToPHP() {
//     // const RV = useRef();
//     const [captchaImageUrl, setCaptchaImageUrl] = useState('');
//     useEffect(() => {
//         axios({
//             url: "http://localhost/Prologin2/public/api/reload-captcha",
//             method: "get",
//         })
//             .then(function (response) {
//                 const imgSrc = response.data.captcha;
//                 console.log(imgSrc);

//                 // 使用正則表達式來擷取 src 屬性中的 URL
//                 const regex = /src="([^"]+)"/;
//                 const match = imgSrc.match(regex);
//                 // console.log(match);
//                 if (match && match.length > 1) {
//                     const imageUrl = match[1];
//                     setCaptchaImageUrl(imageUrl);
//                     console.log(imageUrl);
//                 }

//                 // console.log(response.data.captcha);
//             })
//             .catch(function (error) {
//                 console.error(error);
//             });
//     }, []);
// return(
//     <><Register2 captchaImageUrl={captchaImageUrl}/></>
// )
        
    
// }
// export const captchaGetImageToPHP = () => {
//     const [captchaImageUrl, setCaptchaImageUrl] = useState('');

//     axios({
//       url: "http://localhost/Prologin2/public/api/reload-captcha",
//       method: "get",
//     })
//       .then(function (response) {
//         const imgSrc = response.data.captcha;
//         console.log(imgSrc);

//         // 使用正則表達式來擷取 src 屬性中的 URL
//         const regex = /src="([^"]+)"/;
//         const match = imgSrc.match(regex);
//         // console.log(match);
//         if (match && match.length > 1) {
//           const imageUrl = match[1];
//           setCaptchaImageUrl(imageUrl);
//           console.log(imageUrl);
//         }

//         // console.log(response.data.captcha);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   }


// 關於我的資料
// const Aboutmecontext = createContext();


// function Aboutmedata() {
//     const [data, setdata] = useState(null);
//     const [isDataLoaded, setIsDataLoaded] = useState(false); // 追蹤資料是否已經取得

//     useEffect(() => {
//         axios({
//             url: 'http://localhost/Prologin2/public/api/aboutme',
//             method: 'post',
//             data: {
//                 token: Cookies.get('token'),
//             },
//         })
//         .then(function (response) {
//             setdata(response.data);
//             setIsDataLoaded(true); // 設置為已取得資料
//         })
//         .catch(function (error) {
//             console.log('失敗');
//         });
//     }, []);

//     // 只有在資料取得後才渲染 OtherPage 組件
//     if (!isDataLoaded) {
//         return null;
//     }

//     return (
//         <Aboutmecontext.Provider value={data}>
//             {/* 在這裡渲染其他內容 */}
//             <OtherPage />
//         </Aboutmecontext.Provider>
//     );
// }

// function OtherPage() {
//     const data = useContext(Aboutmecontext);
//     console.log(data);

//     return (
//         <div>
//             {data}
//         </div>
//     );
// }

// export default OtherPage;





export { InserttoSql, LoginFromSql, }
