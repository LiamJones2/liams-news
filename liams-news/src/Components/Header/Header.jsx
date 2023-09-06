import {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

function Header() {
    const {user} = useContext(UserContext)

    useEffect(() => {
    },[user])

    if(user.username !== undefined){
        return (
            <div className='header-div'>
                <h1>Liam&apos;s news</h1>
                <Link to="/"><button>Home</button></Link>
                <Link to="/topics"><button>Topics</button></Link>
                <Link to="/loginsignup"><button><img src={user.avatar_url} alt="" width="20px"/></button></Link>
            </div>
        )
    }

    return (
        <div className='header-div'>
            <h1>Liam&apos;s news</h1>
            <Link to="/"><button>Home</button></Link>
            <Link to="/topics"><button>Topics</button></Link>
            <Link to="/loginsignup"><button>Sign In/Sign Up</button></Link>
        </div>
    )
}

export default Header