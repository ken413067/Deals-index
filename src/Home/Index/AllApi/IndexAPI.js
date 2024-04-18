import React, { useState, createContext, useEffect } from 'react'
import axios from "axios";
import Cookies from 'js-cookie';

export const TakePostcontext = createContext()
export function TakePostProvider({ children }) {
  // 哲楨的rank文章資料
  const [postdata, setpostdata] = useState(null)
  // 李安的全部文章資料
  const [posttime, setposttime] = useState(null)
  // News2的wid傳遞到newspage
  const [pagedata, setpagedata] = useState(null)
  // 獲取收藏文章資料
  const [collect, setcollect] = useState({})

// 以下是內嵌式文章
  // 李安的獲取收藏
  const collectforpost = () => {
    axios({
      url: `http://localhost/Prologin2/public/api/articles/${pagedata}/checkFavorite`,
      method: 'get',
      params: {
        token: Cookies.get('token')
      }
    })
      .then(function (response) {
        setcollect(response.data)
        // console.log(response.data)
      })
      .catch(function (error) {
        console.log("收藏文章獲取失敗", error);
      });
  }
  const handleWidUpdate = () => {
    // 李安的點擊文章收藏
    if (pagedata) {
      axios({
        url: `http://localhost/Prologin2/public/api/articles/${pagedata}/storeTarget`,
        method: 'post',
        data: {
          token: Cookies.get("token")
        }
      })
        .then(function (response) {
          collectforpost()
          console.log(response.data)
        })
        .catch(function (error) {
          console.log("收藏文章失敗", error);
        });
    }
  };

  useEffect(() => {
    // 哲楨的
    axios({
      url: 'http://localhost/Prologin2/public/api/rank',
      method: 'get',
    })
      .then(function (response) {
        const post = response.data.merged_data

        setpostdata(post)
        // console.log(post)
      })
      .catch(function (error) {
        console.log("文章加載失敗");
      });


    // 李安的文章
    axios({
      url: 'http://localhost/Prologin2/public/api/articles',
      method: 'get',
    })
      .then(function (response) {
        const post = Object.values(response.data)
        setposttime(post)
        // console.log(post[0])
      })
      .catch(function (error) {
        console.log("文章加載失敗");
      });

    // 李安的獲取收藏
    collectforpost()

  }, [pagedata])



  const values = {
    postdata, setpostdata,
    pagedata, setpagedata,
    posttime, setposttime,
    collect, setcollect,

    handleWidUpdate,
  }
  return (
    <TakePostcontext.Provider value={values}>
      {children}
    </TakePostcontext.Provider>
  )

}

