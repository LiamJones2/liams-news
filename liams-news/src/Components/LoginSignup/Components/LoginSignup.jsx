import { useContext } from 'react'
import axios from 'axios'

export async function attemptLoginDatabase() {
    const articleVotesDocument = document.getElementById(`login`)
    const loginUsername = articleVotesDocument.value

    if (loginUsername === "") return false

    try {
        return axios.get(`https://nc-news-liam.onrender.com/api/users/${loginUsername}`)
            .then(({data}) => {
                return data.user
            })
            .catch(() => {
                return false
            })
    }
    catch {
        return false
    }
}