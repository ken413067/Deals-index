import React, { createContext, useState, useContext } from 'react';
import Login2 from '../LoginRegister/Login2';
import Cookies from 'js-cookie';



export const CategoryContext = createContext();


export function CategoryProvider({ children }) {

    // 喜歡按鈕
    const [loveStates, setLoveStates] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    // 不喜歡按鈕
    const [hateStates, setHateStates] = useState({});
    const [dislikeCounts, setDislikeCounts] = useState({});

    // 追蹤用戶點擊的標籤，預設為熱門文章
    const [selectedTab, setSelectedTab] = useState('hot');
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };


    // 這是搜索及首頁篩選用的資料
    const [category, setCategory] = useState('');
    const [searchref, setsearchref] = useState('')
    const search = searchref

    // 初始載入文章數量
    const [postQuantity, setPostQuantity] = useState(4)

    const postclick = () => (
        setPostQuantity(postQuantity => postQuantity + 4)
    )

    // 從new2搬來的文章
    //使用者沒登入會彈出視窗
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const checkLoginStatus = () => {
        const token = Cookies.get('token');
        if (token) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    };


    // 將時間轉換為中文年月日格式
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0').replace(/^0+/, '');
        const day = date.getDate().toString().padStart(2, '0').replace(/^0+/, '');
        return `${year}年${month}月${day}日`;
    };

    // new2拿到的全部排序資料
    const [postbook, setPostBook] = useState([]);
    // 關於搜索以及排序，判斷是否按讚
    const fetchPostBook = () => {
        let url = `http://localhost/Prologin2/public/api/rank`;
        if (category !== '' && search !== '') {
            url += `?category=${category}&search=${search}`;
            console.log('cons', search)
        } else if (category !== '') {
            url += `?category=${category}`;
        } else if (search !== '') {
            url += `?search=${search}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const dataArray = Object.values(data.merged_data);
                const getTimeScore = (dateStr) => {
                    const dateDiff = Math.ceil((new Date() - new Date(dateStr)) / (1000 * 3600 * 24));
                    if (dateDiff > 7) return 0;
                    else if (dateDiff > 3) return 1;
                    else return 2;
                }
                const sortedArticles = selectedTab === 'hot'
                    ? [...dataArray].sort((a, b) => {
                        const scoreA = (a.total_likes - a.total_dislikes) * getTimeScore(a.PostTime);
                        const scoreB = (b.total_likes - b.total_dislikes) * getTimeScore(b.PostTime);
                        if (scoreA === scoreB) {
                            return (b.total_likes - b.total_dislikes) - (a.total_likes - a.total_dislikes);
                        }
                        return scoreB - scoreA; // 降序排列
                    })
                    : [...dataArray].sort((a, b) => new Date(b.PostTime) - new Date(a.PostTime));
                // 取所有文章資料
                setPostBook(sortedArticles);//原本是sortedArticles
                console.log(postbook)
                // 檢查用戶有點過喜歡的文章，並設置按鈕顏色
                if (isUserLoggedIn) {
                    checkUserLikes(dataArray);
                } else {
                    setInitialLikes(dataArray);
                }
            })
            .catch(error => console.error('Error fetching article:', error));
    };
  // 檢查用戶是否有對文章按過讚
  const checkUserLikes = (dataArray) => {
    const token = Cookies.get('token');
    // if (token) {
    fetch('http://localhost/Prologin2/public/api/like'
        , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                token: token
            })
        }
    )
        .then(response => response.json())
        .then(data => {
            // 使用filter將使用者按過讚的文章取出再用map印出
            const userLikes = data.filter(item => item.GiveLike === 1).map(item => item.WID);
            // console.log('有登入會跑這個出來')
            const userDislikes = data.filter(item => item.GiveDislike === 1).map(item => item.WID);
            // useStates綁定
            const loveStatesCopy = { ...loveStates };
            const hateStatesCopy = { ...hateStates };
            const likeCountsCopy = { ...likeCounts };
            const dislikeCountsCopy = { ...dislikeCounts };

            // 在此做判斷
            dataArray.forEach(article => {
                if (userLikes.includes(article.WID)) {
                    loveStatesCopy[article.WID] = true;
                } else {
                    loveStatesCopy[article.WID] = false;
                }
                if (userDislikes.includes(article.WID)) {
                    hateStatesCopy[article.WID] = true;
                } else {
                    hateStatesCopy[article.WID] = false;
                }
                likeCountsCopy[article.WID] = parseInt(article.total_likes, 10);
                dislikeCountsCopy[article.WID] = parseInt(article.total_dislikes, 10);
            });
            setLoveStates(loveStatesCopy);
            setHateStates(hateStatesCopy);
            setLikeCounts(likeCountsCopy);
            setDislikeCounts(dislikeCountsCopy);
        })
        .catch(error => console.error('Error:', error));
    // }
};

const setInitialLikes = (dataArray) => {
    const likeCountsCopy = { ...likeCounts };
    // console.log('沒登入會跑這個出來')
    const dislikeCountsCopy = { ...dislikeCounts };
    dataArray.forEach(article => {
        likeCountsCopy[article.WID] = parseInt(article.total_likes, 10);
        dislikeCountsCopy[article.WID] = parseInt(article.total_dislikes, 10);
    });
    setLikeCounts(likeCountsCopy);
    setDislikeCounts(dislikeCountsCopy);
};



const toggleLove = (wid) => {
    if (!isUserLoggedIn) {
        alert('請登入才能使用此功能');
        return;
    }
    // 如果文章已經點擊過不喜歡，點擊喜歡時，不喜歡總數-1且將愛心顏色設置為false
    if (hateStates[wid]) {
        setDislikeCounts(prevState => ({
            ...prevState,
            [wid]: dislikeCounts[wid] - 1
        }));
        setHateStates(prevState => ({
            ...prevState,
            [wid]: false
        }));
    }

    // 喜歡按鈕為true的話喜歡總數-1，為false則+1
    const newLikeCount = loveStates[wid] ? likeCounts[wid] - 1 : likeCounts[wid] + 1;

    setLikeCounts(prevState => ({
        ...prevState,
        [wid]: newLikeCount
    }));
    setLoveStates(prevState => ({
        ...prevState,
        [wid]: !prevState[wid]
    }));

    // 傳送action為like
    updateLikeDislike(wid, 'like');
};

const toggleHate = (wid) => {
    if (!isUserLoggedIn) {
        alert('請登入才能使用此功能');
        return;
    }
    if (loveStates[wid]) {
        setLikeCounts(prevState => ({
            ...prevState,
            [wid]: likeCounts[wid] - 1
        }));
        setLoveStates(prevState => ({
            ...prevState,
            [wid]: false
        }));
    }
    const newDislikeCount = hateStates[wid] ? dislikeCounts[wid] - 1 : dislikeCounts[wid] + 1;
    setDislikeCounts(prevState => ({
        ...prevState,
        [wid]: newDislikeCount
    }));
    setHateStates(prevState => ({
        ...prevState,
        [wid]: !prevState[wid]
    }));
    updateLikeDislike(wid, 'dislike');
};
// 收藏按鈕
// const [collectStates, setCollectStates] = useState({});
// const toggleCollect = (id) => {
//     setCollectStates(prevState => ({
//         ...prevState,
//         [id]: !prevState[id]
//     }));
// };

// 存入使用者喜歡和不喜歡的資料
const updateLikeDislike = (wid, action) => {
    const token = Cookies.get('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            wid: wid,
            token: token,
            action: action
        })
    };

    fetch('http://localhost/Prologin2/public/api/a', requestOptions)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};




    const values = {
        category, setCategory,//篩選用
        searchref, setsearchref,//搜索用
        isUserLoggedIn, setIsUserLoggedIn,// 判斷登陸
        postbook, setPostBook,// new2拿到的全部排序資料
        checkLoginStatus, // 判斷登陸的函數
        postQuantity, postclick,//設定載入文章數量
        // 喜歡按鈕
        loveStates, setLoveStates,
        likeCounts, setLikeCounts,
        // 不喜歡按鈕
        hateStates, setHateStates,
        dislikeCounts, setDislikeCounts,

        formatDate,//po文時間的轉換
        fetchPostBook,// 關於搜索以及排序，判斷是否按讚
        toggleLove,//點讚的登入才能使用此功能
        toggleHate,//倒讚的登入才能使用此功能



    }
    return (
        <CategoryContext.Provider value={values}>
            {children}
        </CategoryContext.Provider>
    );
};
