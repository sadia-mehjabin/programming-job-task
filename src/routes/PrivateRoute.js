import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';



const PrivateRoute = ({children}) => {
    const {user, load} = useContext(authContext)
    const location = useLocation();
    if(load){
        return <button className="btn loading">loading</button>
    }

    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>;
};

export default PrivateRoute; 