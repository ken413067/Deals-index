import React, { useState, useContext } from 'react'
import { TakePostcontext, TakePostProvider } from './IndexAPI'



export function Testapi() {
    const { postdata } = useContext(TakePostcontext)
    const datapost = postdata && postdata[0] ? postdata[0] : '沒拿到資料'
    // const datapost1 = postdata && postdata ? postdata : '沒拿到資料'
    console.log(datapost)
    return (
        <div>
            {datapost.map((prop, index) => (
                <div key={index}>
                    <div>{prop.title}</div>
                    <div>{prop.wid}</div>
                </div>
            ))}
        </div>
    )
}
function Alltest() {
    return (
        <TakePostProvider>
            <Testapi />
        </TakePostProvider>
    )
}

export default Alltest