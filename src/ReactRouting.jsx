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
import ProtectedRoute from './Router/protectedRoute'
import AuthRoutes from './Router/AuthRoutes'


function ReactRouting() {
  return (

    <Routes>

      <Route path='/signup' element={<AuthRoutes><SignUp /></AuthRoutes>} />
      <Route path='/signin' element={<AuthRoutes><SignIn /></AuthRoutes>} />

      <Route path="/" element={ <ProtectedRoute><FunDoo/></ProtectedRoute>}>
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