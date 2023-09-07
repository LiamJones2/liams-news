import {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

function Header() {
    const {user} = useContext(UserContext)

    function CheckIfLoggedIn() {
        if(user.username !== undefined){
            return (
                <><Link to="/loginsignup"><button><img src={user.avatar_url} alt="" width="20px"/></button></Link></>
            )
        }
        else return <Link to="/loginsignup"><button>Sign In/Sign Up</button></Link>
    }

    return (
        <div className='header-div'>
            <h1>Liam&apos;s news</h1>
            <Link to="/"><button>Home</button></Link>
            <Link to="/topics"><button>Topics</button></Link>
            <CheckIfLoggedIn />
        </div>
    )
}

export default Header