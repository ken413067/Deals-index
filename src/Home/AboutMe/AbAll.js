import React ,{useEffect}from 'react'
import {useNavigate} from 'react-router-dom'

import { AboutmeProvider } from './AbRouter';
import { Material } from './AbMaterial'
import Appbar from '../Index/Appbar';
import Cookies from 'js-cookie';




function AbAll() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // 嘗試從Cookies中獲取token
  //   const token = Cookies.get('token');

  //   // 如果沒有找到token，則導航到登入頁面
  //   if (!token) {
  //     navigate('/login'); // 確保'/login'是你的登入頁面路徑
  //   }
  // }, [navigate]);

  return (
    <AboutmeProvider>
      <Appbar />
      <Material />
    </AboutmeProvider>
  )
}

export default AbAll