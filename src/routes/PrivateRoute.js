import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    let checkLogin = JSON.parse(localStorage.getItem('_loginStatus'));

    if (!checkLogin) {
        return <Outlet />
    } else {
        alert("You cann't access here without login.")
        return <Navigate to={"/auth"} />
    }
}

export default PrivateRoute;