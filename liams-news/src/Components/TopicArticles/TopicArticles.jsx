import {useState} from 'react'

import TopicArticlesList from './TopicArticlesComponents/TopicArticlesList';
import TopicArticlesSearch from './TopicArticlesComponents/TopicArticlesSearch';
import { useParams } from 'react-router-dom';

function TopicArticles() {
    const {topic} = useParams()
    const [sortBy, setSortBy] = useState({userFacingLabel:"Date", apiAccessKey:"created_at"})
    const [order, setOrder] = useState("DESC")
    return (
        <div>
            <TopicArticlesSearch sortBy={sortBy} setSortBy={setSortBy} setOrder={setOrder}/>
            <TopicArticlesList topic={topic} sortBy={sortBy} order={order}/>
        </div>
    )
}

export default TopicArticles