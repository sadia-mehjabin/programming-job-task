import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/AuthProvider';
import useAccessToken from '../hooks/useAccessToken';

const Register = () => {
    const { register, formState: {errors}, handleSubmit, reset } =     useForm();
    const {createUser, updatedUser, load} = useContext(authContext)
    
    const [registerError, setRegisterError] = useState('')
    const [createdEmail, setCreatedEmail] = useState('')
    const [token] = useAccessToken(createdEmail)
    const navigate = useNavigate()

    // if(token){
    //     navigate('/')
    // }

    const handleregister = data => {
        setRegisterError('')
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            const userInfo = {
                displayName: data.name
            }
            updatedUser(userInfo)
            .then(()=> {
                saveUser(data.name, data.email, data.password) 
            })
            .catch(error => console.log(error)) 
        })
        .catch(error => setRegisterError(error))
    }
    
    const saveUser = (name, email, password) => {
        const user = {name, email, password};
        fetch('https://programming-job-task-server.vercel.app/registration',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged === true){
                setCreatedEmail(email)
                toast('user added successfully') 
            }
        })
        reset()
    }
    
    return (
        <div className='hero'>
            <div className="card w-full bg-pink-100 max-w-sm shadow-2xl m-5 p-6">
            <h1 className="text-5xl m-5 font-bold text-center">Register now!</h1>
            <form onSubmit={handleSubmit(handleregister)}>
               <label className="label">
                <span className="label-text">Full name</span>
            </label>
                <input className='input input-bordered w-full' 
            {...register("name", {required: "name is required"})
            } /> 
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
            <p className='m-3'>Already registered in Power-Hack? <Link
             className='text-blue-400 font-semibold' to={'/login'}>Login</Link> now</p>

            <input className='btn bg-pink-400 w-full' value='Register' type="submit" />
            </form>
        </div>
        </div>
    );
};

export default Register;