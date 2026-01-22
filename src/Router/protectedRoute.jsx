import { Navigate } from "react-router-dom";

export default function protectedRoute({children}){
    const user = localStorage.getItem("loggedInUser");

    return user? children :<Navigate to="/signin" />;
}