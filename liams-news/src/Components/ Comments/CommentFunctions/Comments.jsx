import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

export function deleteCommentToArticle(comment, setUpdating, setCommentsList, commentsList, button) {
    button.textContent = "Deleting..."

    axios.delete(`https://nc-news-liam.onrender.com/api/comments/${comment.comment_id}`)
        .then(() => {
            const commentIndex = commentsList.indexOf(comment);
            if (commentIndex !== -1) {
                toast.success("Comment deleted successfully!");
                let updatedComments = [...commentsList]
                updatedComments[commentIndex] = { body: "Comment deleted successfully!" }
                setCommentsList(updatedComments)
                setUpdating(true)
            }
        })
        .catch(() => {
            button.textContent = "Error. Try again to delete"
        })
}

export function addNewCommentToArticle(article_id, username, setUpdating, setCommentsList, commentsList, comment, button, setErr) {
    const commentToAdd = comment
    button.textContent = "Adding..."

    if (commentToAdd !== "" && commentToAdd !== undefined) {
        axios.post(`https://nc-news-liam.onrender.com/api/articles/${article_id}/comments`, {
            username: username,
            body: commentToAdd
        })
            .then(({ data }) => {
                setCommentsList([data, ...commentsList])
                setUpdating(true)
                toast.success("Comment added successfully!");
                button.textContent = "Submit comment"
                setErr("")
            })
            .catch(() => {
                button.textContent = "Error. Add new comment"
                setErr("Sorry there was a problem adding your comment")
            })
    }
    else {
        setErr("Please input text above to make a comment")
        button.textContent = "Submit comment"
    }
}

export function NewCommentSection({ user, article_id, setUpdating, setCommentsList, commentsList }) {
    const [comment, setComment] = useState()
    const [err, setErr] = useState(false)

    if (user.username === undefined) {
        return (
            <Link to="/loginsignup"><button>Login to make a comment</button></Link>
        )
    }
    else {
        return (
            <div>
                <h1>Write a comment</h1>
                <input id={article_id + "comments"} value={comment} type="text" height="500px" onChange={(event) => {
                    setComment(event.target.value);
                }} />
                <button onClick={(event) => {
                    addNewCommentToArticle(article_id, user.username, setUpdating, setCommentsList, commentsList, comment, event.target, setErr);
                    setComment("")
                }}>Submit comment</button>
                {err ? <p className="error">{err}</p> : null}
            </div>
        )
    }
}