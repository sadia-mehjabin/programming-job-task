import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/AuthProvider';
import useAccessToken from '../hooks/useAccessToken';

const Login = () => {
    const provider = new GoogleAuthProvider()
    const {userLogin, googleLogin, load} = useContext(authContext)
    const { register, formState: {errors}, handleSubmit } =  useForm();
    const [loginUserEmail, setLoginUserEmail] = useState("")
    const [loginError, setLoginError] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/' ;
    const [token] = useAccessToken(loginUserEmail)
    console.log(token)
    // if(token){
    //     navigate(from, {replace:true})
    // } 
    const handleLogin = data => {
        setLoginError('')
        userLogin(data.email, data.password)
        .then(result => {
            const user = result.user;
            setLoginUserEmail(data.email)
            toast('successfully Loged in')
            
        })
        .catch(error => setLoginError(error.message))
    }

    const handleGoogleLogIn = () => {
        googleLogin(provider)
        .then(result => {
            const user = result.user;
            navigate(from, {replace:true})
        })
        .catch(err => console.error(err))
    }

    return (
        <div className='hero'>
            <div className="card w-full bg-pink-100 max-w-sm shadow-2xl m-5 p-6">
            <h1 className="text-5xl m-5 font-bold text-center">Login now!</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
               <label className="label">
                <span className="label-text">Email</span>
            </label>
                <input className='input input-bordered w-full' 
            {...register("email", {required: "email is required"})
            } /> 
            {
                errors.email && <p className='text-red-500 font-semibold' role="alert">{errors.email?.message}</p>
            }
             <br />
            <label className="label">
                <span className="label-text">Password</span>
            </label>
            <input className='input input-bordered w-full' {...register("password", {
                required: "password is required"
            }) } /> <br />
            {
                errors.password && <p className='text-red-500 font-semibold' role="alert">{errors.password?.message}</p>
            }
            <p className='m-3'>New to Power-Hack? <Link className='text-blue-400 font-semibold' to={'/register'}>register</Link></p>

            {
                loginError && <p className='text-red-500 font-semibold'>{loginError}</p>
            }
            <input className='btn bg-pink-400 w-full' value='login' type="submit" />
            </form>
            <button onClick={handleGoogleLogIn} className='btn btn-outline w-full my-3'>Log in With Google</button>
        </div>
        </div>
    );
};

export default Login;