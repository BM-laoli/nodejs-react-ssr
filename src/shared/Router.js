import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../client/modules/Home'
import Production from '../client/modules/Production'

export default  () => {
  return   (
    <Routes>
        <Route  path="/"  element={<Home/>} />
        <Route  path="/production"  element={<Production/>} />
    </Routes>
  )
}