import React from "react";

import { Navigate, useNavigate } from "react-router-dom";

import { useCookies } from 'react-cookie';
export default function Logout(){

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const navigate = useNavigate();
    navigate('/')
    
    
}