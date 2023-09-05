import { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom';

function ArticlesList({ sortBy, order }) {
    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        let searchURL = `https://nc-news-liam.onrender.com/api/articles`

        searchURL += `?sort_by=${sortBy.database}`
        searchURL += `&order=${order}`


        axios.get(searchURL)
            .then(function ({ data }) {
                return data
            })
            .then((response) => {
                setArticlesList(response)
                setLoading(false)
            })
    }, [sortBy, order])


    if (loading) return (<div><h1>Loading</h1></div>)

    return (
        <div className='article-list-div'>
            {
                articlesList.map((article) => {
                    return <div key={article.article_id} className='article-card'>
                        <div>
                        <h1 className='article-title'>{article.title}</h1>
                        </div>
                            <div className='article-votes'>
                            <h2 id={`article${article.article_id}votes`}>Votes: {article.votes}</h2>
                            </div>
                        <div className='article-image'>
                        <img src={article.article_img_url} alt="" />
                        </div>
                        <div className='article-comments'>
                        <Link to={`/article/${article.article_id}#comments`}><button>Comments : {article.comment_count}</button></Link>
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

export default ArticlesList