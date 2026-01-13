import React from 'react'
import FunDoo from './Dashboard/FunDoo'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import {Route, Routes} from 'react-router-dom'


function ReactRouting() {
  return (

    <Routes>
<Route path='/'element={<FunDoo/>}/>
<Route path='/signup'element={<SignUp/>}/>
<Route path='/signin'element={<SignIn/>}/>

    </Routes>
  )
}

export default ReactRouting