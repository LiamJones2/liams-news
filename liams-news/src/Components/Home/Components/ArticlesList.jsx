import { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { upvoteArticle, downvoteArticle } from '../../Votes/Votes';

function ArticlesList({ sortBy, order }) {
    const [articlesList, setArticlesList] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        setErr(false)

        axios.get(`https://nc-news-liam.onrender.com/api/articles?sort_by=${sortBy.apiAccessKey}&order=${order}`)
            .then(function ({ data }) {
                return data
            })
            .then((response) => {
                setArticlesList(response)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setErr(true)
            })
    }, [sortBy, order])


    if (loading) return (<div><h1>Loading</h1></div>)

    if(err) return ( <div>
        <h1>Oops. Looks like the server might be down currently</h1>
        <h2>Please try again later</h2>
        </div> )

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
                        <Link to={`/article/${article.article_id}`}><button>Read</button></Link>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default ArticlesList