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
import ProtectedRoute from './Router/ProtectedRoutes'
import AuthRoutes from './Router/AuthRoutes'
import ForgotPassword from './Components/ForgetPassword'
import VerifyOTP from "./Components/VerifyOtp";
import ResetPassword from "./Components/ResetPassword";


function ReactRouting() {
  return (

    <Routes>

      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />

      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

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