import { useContext } from 'react'
import axios from 'axios'

export async function attemptLoginDatabase(loginAttempt) {
    if (loginAttempt === "") return false

    try {
        return axios.get(`https://nc-news-liam.onrender.com/api/users/${loginAttempt}`)
            .then(({data}) => {
                return data.user
            })
    }
    catch {
        return false
    }
}