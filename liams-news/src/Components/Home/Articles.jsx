import {useState} from 'react'

import ArticlesList from './Components/ArticlesList';
import ArticlesSearch from './Components/ArticlesSearch';

function Articles() {
    const [sortBy, setSortBy] = useState({website:"Date", database:"created_at"})
    const [order, setOrder] = useState("DESC")
    return (
        <div>
            <ArticlesSearch sortBy={sortBy} setSortBy={setSortBy} setOrder={setOrder}/>
            <ArticlesList sortBy={sortBy} order={order}/>
        </div>
    )
}

export default Articles