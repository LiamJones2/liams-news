import { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { NewCommentSection, deleteCommentToArticle } from './CommentFunctions/Comments'


function Comments({ article_id }) {
    const { user } = useContext(UserContext)

    const [commentsList, setCommentsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        setLoading(false)
        setUpdating(false)

    }, [updating])

    useEffect(() => {
        setLoading(true)
        setUpdating(false)

        if (article_id) {
            axios.get(`https://nc-news-liam.onrender.com/api/articles/${article_id}/comments`)
                .then(function ({ data }) {
                    return data
                })
                .then((response) => {
                    setCommentsList(response.comments)
                    setLoading(false)
                })
        }
    }, [])


    if (loading) return (<div><h1>Loading</h1></div>)


    return (
        <div>
            <NewCommentSection user={user} article_id={article_id} setUpdating={setUpdating} setCommentsList={setCommentsList} commentsList={commentsList}/>
            <div className='comment-list-div'>
                {
                    commentsList.map((comment) => {
                        return <div key={comment.comment_id} className='comment-card'>
                            <h1>{comment.author}</h1>
                            <h2>Votes: {comment.votes}</h2>
                            <p>{comment.body}</p>  
                            {comment.author === user.username ? (<button onClick={(event) => deleteCommentToArticle(comment, setUpdating, setCommentsList, commentsList, event.target)}>Delete your comment</button>) : null}                     
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Comments