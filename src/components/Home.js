import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')){
            console.log('hello');
        }else{
            navigate('/user-profile')
        }
    }, [])
    return (
        <div className='container my-3'>
            Home
        </div>
    )
}
