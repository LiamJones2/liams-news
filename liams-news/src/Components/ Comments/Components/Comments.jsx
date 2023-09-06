import axios from "axios"
import { Link } from 'react-router-dom'

export function addNewCommentToArticle(article_id, username, setUpdating, setCommentsList, commentsList) {
    const newCommentBodyDocument = document.getElementById(`${article_id}comments`)

    axios.post(`https://nc-news-liam.onrender.com/api/articles/${article_id}/comments`, {
        username: username,
        body: newCommentBodyDocument.value
    })
    .then(({data}) => {
        setCommentsList([data,...commentsList])
        setUpdating(true)
        window.alert("added")  
    })
}

export function NewCommentSection ({user, article_id, setUpdating, setCommentsList, commentsList}) {
    if(user.username === undefined){
        return (
            <Link to="/loginsignup"><button>Login to make a comment</button></Link>
        )
    }
    else {
        return (
            <div>
                <h1>Write a comment</h1>
                <input id={article_id + "comments"} type="text" height="500px" />
                <button onClick={() => addNewCommentToArticle(article_id, user.username, setUpdating, setCommentsList, commentsList)}>Submit comment</button>
            </div>
        )
    }
}