import { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { attemptLoginDatabase } from './Components/LoginSignup'

function LoginSignup() {
    const { setUser } = useContext(UserContext)

    const [wrongLogin, setWrongLogin] = useState(false)
    const [loginValue, setLoginValue] = useState("")

    const navigate = useNavigate()

    function CheckForWrongLogin() {
        if(wrongLogin) return ( <><h1>{wrongLogin}</h1></> )
        else return
    }

    async function attemptToLogin() {
        const returnedUser = await attemptLoginDatabase(loginValue)
        if (returnedUser.username !== undefined) {
            setUser(returnedUser)
            navigate("/")
        }
        else setWrongLogin(returnedUser.errMsg)
    }

    useEffect(() => {
    }, [wrongLogin])

    return (
        <div className=''>
            <CheckForWrongLogin />
            <h1>Login</h1>
            <input id='login' type="text" onChange={(event) =>
                setLoginValue(event.target.value)} />
            <button onClick={attemptToLogin}>Login</button>
            <h1>Signup</h1>
        </div>
    )
}

export default LoginSignup