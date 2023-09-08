import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Topics() {
    const [topicList, setTopicList] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        setErr(false)

        let searchURL = `https://nc-news-liam.onrender.com/api/topics`

        axios.get(searchURL)
            .then(function ({ data }) {
                return data
            })
            .then((response) => {
                setTopicList(response)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setErr(true)
            })
    }, [])


    if (loading) return (<div><h1>Loading</h1></div>)

    if (err) return (<div>
        <h1>Oops. Looks like the server might be down</h1>
        <h2>Please try again later</h2>
    </div>)

    return (
        <div className="topicList">
            {
                topicList.map((topic) => {
                    return <div key={topic.slug} className='topic-card'>
                        <Link to={"/topicarticles/" + topic.slug}><button>{topic.slug}</button></Link>
                        <p>{topic.description}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Topics