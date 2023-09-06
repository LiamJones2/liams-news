import { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import {attemptLoginDatabase} from './Components/LoginSignup'

function LoginSignup() {
    const {setUser} = useContext(UserContext)

    const [wrongLogin, setWrongLogin] = useState(false)

    const navigate = useNavigate()

    async function attemptToLogin() {
        const returnedUser = await attemptLoginDatabase()
        if(returnedUser.username !== undefined) {
            setUser(returnedUser) 
            navigate("/")
        }
        else setWrongLogin(true)
    }

    useEffect(() => {
    }, [wrongLogin])


    if(wrongLogin) {
        return (
            <div className=''>
                <h1>Wrong login</h1>
                <h1>Login</h1>
                <input id='login' type="text" />
                <button onClick={attemptToLogin}>Login</button>
                <h1>Signup</h1>
            </div>
        )
    }

    return (
        <div className=''>
            <h1>Login</h1>
            <input id='login' type="text" />
            <button onClick={attemptToLogin}>Login</button>
            <h1>Signup</h1>
        </div>
    )
}

export default LoginSignup