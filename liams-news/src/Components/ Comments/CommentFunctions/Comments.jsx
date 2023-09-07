import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'

export function deleteCommentToArticle(comment, setUpdating, setCommentsList, commentsList, button) {
    button.textContent = "Deleting..."

    axios.delete(`https://nc-news-liam.onrender.com/api/comments/${comment.comment_id}`)
        .then(() => {
            const commentIndex = commentsList.indexOf(comment);
            if(commentIndex !== -1) {
                let updatedComments = [...commentsList.slice(0, commentIndex), ...commentsList.slice(commentIndex+1)]
                setCommentsList(updatedComments)
                setUpdating(true)
                window.alert("deleted")
            }
        })
}

export function addNewCommentToArticle(article_id, username, setUpdating, setCommentsList, commentsList, comment) {

    axios.post(`https://nc-news-liam.onrender.com/api/articles/${article_id}/comments`, {
        username: username,
        body: comment
    })
        .then(({ data }) => {
            setCommentsList([data, ...commentsList])
            setUpdating(true)
            window.alert("added")
        })
}

export function NewCommentSection({ user, article_id, setUpdating, setCommentsList, commentsList }) {
    const [comment, setComment] = useState()

    if (user.username === undefined) {
        return (
            <Link to="/loginsignup"><button>Login to make a comment</button></Link>
        )
    }
    else {
        return (
            <div>
                <h1>Write a comment</h1>
                <input id={article_id + "comments"} value={comment} type="text" height="500px" onChange={(event) =>
                    setComment(event.target.value)} />
                <button onClick={() => addNewCommentToArticle(article_id, user.username, setUpdating, setCommentsList, commentsList, comment)}>Submit comment</button>
            </div>
        )
    }
}