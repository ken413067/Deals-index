import React, { useContext } from 'react'
import Page1 from './Page1'
import Listgogo from './Listgogo'
import AbAll from '../AboutMe/AbAll'
import Login2 from '../LoginRegister/Login2';
import { LRRouter } from '../LRRouter';



import { CategoryProvider } from './CategoryContext'

function ALLtest() {
  return (
    <CategoryProvider>
      <LRRouter />
    </CategoryProvider>
  )
}

export default ALLtest
