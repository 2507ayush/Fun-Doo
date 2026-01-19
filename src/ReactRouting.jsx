import React from 'react'
import FunDoo from './Dashboard/FunDoo'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom'
import Notes from './Components/Notes'
import Trash from './Components/Trash'
import Archive from './Components/Archive'
import Edit_Label from './Components/Edit_label'
import Reminder from './Components/Reminder'


function ReactRouting() {
  return (

    <Routes>

      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />

      <Route path="/" element={<FunDoo/>}>
      <Route index element={<Notes/>}/>
      <Route path='trash' element={<Trash/>}/>
      <Route path='archive' element={<Archive/>}/>
      <Route path='edit_Labels' element={<Edit_Label/>}/>
      <Route path='reminder' element={<Reminder/>}/>
      </Route>
    </Routes>


  )
}

export default ReactRouting