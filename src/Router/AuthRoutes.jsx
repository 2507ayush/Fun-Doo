import { Navigate } from "react-router-dom";


export default function AuthRoutes({children}) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    return user?<Navigate to="/" />:children;
  
}
