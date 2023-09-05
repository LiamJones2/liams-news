import { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import { useParams } from 'react-router-dom';
import axios from 'axios'

function Article() {
    const { article_id } = useParams()

    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)

        let searchURL = `https://nc-news-liam.onrender.com/api/articles/${article_id}`

        axios.get(searchURL)
            .then(({ data }) => {
                return data
            })
            .then((response) => {
                setArticle(response.article)
                setLoading(false)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
    }, [])


    if (loading) return (<div><h1>Loading</h1></div>)

    if (error) {
        return (
            <div>
                <h1>That article does not exist</h1>
            </div>
        )
    }

    return (
        <div className='article-list-div'>
            <h1>{article.title}</h1>
            <h2>Votes: {article.votes}</h2>
            <img src={article.article_img_url} alt="" />
            <p>{article.body}</p>
        </div>
    )
}

export default Article