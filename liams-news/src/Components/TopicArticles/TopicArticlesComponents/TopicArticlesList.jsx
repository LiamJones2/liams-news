import { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom';

import { upvoteArticle, downvoteArticle } from '../../Votes/Votes'

function TopicArticlesList({ topic, sortBy, order }) {
    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)

        const searchURL = `https://nc-news-liam.onrender.com/api/articles?topic=${topic}&sort_by=${sortBy.apiAccessKey}&order=${order}`


        axios.get(searchURL)
            .then(function ({ data }) {
                return data
            })
            .then((response) => {
                if(response.length === 0){
                    throw new Error
                }
                setArticlesList(response)
                setLoading(false)
            })
            .catch((err) => {
                if(err.message === "Network Error") setError("We are experiencing network errors currently")
                else setError("That topic might not exist")
                setLoading(false)
            })
    }, [topic, sortBy, order])


    if (loading) return (<div><h1>Loading</h1></div>)

    if(error) {
        return ( 
        <div>
            <h1>Oops. We encountered an error</h1>
            <h1>{error}</h1>
            <Link to="/topics"><button>See all topics</button></Link>
        </div> )
    }

    return (
        <div className='article-list-div'>
            <h1>{topic}</h1>
            {
                articlesList.map((article) => {
                    return <div key={article.article_id} className='article-card'>
                        <div>
                        <h1 className='article-title'>{article.title}</h1>
                        </div>
                        <div className='article-votes'>
                            <h2 id={`article${article.article_id}votes`}>Votes: {article.votes}</h2>
                            <button onClick={() => upvoteArticle(article.article_id)}>Plus</button>
                            <button onClick={() => downvoteArticle(article.article_id)}>Minus</button>
                        </div>
                        <div className='article-image'>
                        <img src={article.article_img_url} alt="" />
                        </div>
                        <div className='article-comments'>
                        <Link to={`/article/${article.article_id}`}><button>Comments : {article.comment_count}</button></Link>
                        </div>
                        <div className='article-read'>
                        <Link to={`/article/${article.article_id}`}><button>See</button></Link>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default TopicArticlesList