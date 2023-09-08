import { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { attemptLoginDatabase } from './Components/LoginSignup'

function LoginSignup() {
    const { setUser } = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [users, setUsers] = useState([])

    const [wrongLogin, setWrongLogin] = useState(false)
    const [loginValue, setLoginValue] = useState("")

    const navigate = useNavigate()

    function CheckForWrongLogin() {
        if (wrongLogin) return (<div className='error'><p>{wrongLogin}</p></div>)
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
        setLoading(true)
        setErr(false)

        axios.get('https://nc-news-liam.onrender.com/api/users')
            .then(({ data }) => {
                setUsers(data.users)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setErr(true)
            })

    }, [wrongLogin])

    if (loading) return (<div><h1>Loading</h1></div>)

    if (err) return (<div className='error'>
        <h1>Oops. Looks like were having network problems</h1>
        <h2>Please try again later</h2>
    </div>)

    return (
        <div className=''>
            
            <h1>Login</h1>
            <input id='login' type="text" onChange={(event) =>
                setLoginValue(event.target.value)} />
            <button onClick={attemptToLogin}>Login</button>
            <CheckForWrongLogin />
            <br />
            <br />
            <h2>Login as an existing user</h2>
            <div className='user-card-div'>
            {
                users.map((user) => {
                    return <button key={user.username} onClick={() => {
                        setUser(user)
                        navigate("/")
                    }}><div  className='user-card'>
                        <h2>{user.username}</h2>
                        <img src={user.avatar_url} alt={user.username + "'s avatar image"} width="100px" height="100px" />
                    </div>
                    </button>
                })
            }
            </div>
        </div>
    )
}

export default LoginSignup