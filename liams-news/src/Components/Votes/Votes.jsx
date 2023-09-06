import axios from 'axios'

export function upvoteArticle(article_id) {
    const articleVotesDocument = document.getElementById(`article${article_id}votes`)
    let articleVotes = articleVotesDocument.textContent.split(" ").pop()
    articleVotesDocument.textContent = "Votes " + (++articleVotes)

    axios.patch(`https://nc-news-liam.onrender.com/api/articles/${article_id}`, {
        inc_votes: 1
    }).then(() => {
        window.alert("Article vote plused")
    })
    .catch(() => {
        window.alert("Error voting")
        articleVotesDocument.textContent = "Votes " + (--articleVotes)
    })
}

export function downvoteArticle(article_id) {
    const articleVotesDocument = document.getElementById(`article${article_id}votes`)
    let articleVotes = articleVotesDocument.textContent.split(" ").pop()
    articleVotesDocument.textContent = "Votes " + (--articleVotes)

    axios.patch(`https://nc-news-liam.onrender.com/api/articles/${article_id}`, {
        inc_votes: -1
    }).then(() => {
        window.alert("Article vote minused")
    })
    .catch(() => {
        articleVotesDocument.textContent = "Votes " + (++articleVotes)
        window.alert("Error voting")
    })
}