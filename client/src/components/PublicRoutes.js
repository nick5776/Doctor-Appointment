import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PublicRoutes({children}) {
    if(localStorage.getItem("token")){
         return <Navigate to="/" /> // token exists → already logged in → go to homepage
    }
    else{
        return children; //login and register act as children here
    }
}
