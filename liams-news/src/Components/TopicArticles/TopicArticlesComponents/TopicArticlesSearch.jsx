import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function TopicArticlesSearch({ sortBy, setSortBy, order, setOrder}) {
    const sortByList = [{userFacingLabel:"Date", apiAccessKey:"created_at"}, {userFacingLabel:"Comment Count", apiAccessKey:"comment_count"}, {userFacingLabel:"Votes", apiAccessKey:"votes"}]

    function toggleDropDownSortByList(sortByDropdown) {
        sortByDropdown.classList.toggle("show");
    }

    return (
        <div className='article-list-div'>
            <button onClick={() => toggleDropDownSortByList(sortByDropdown)}>Sort By : {sortBy.userFacingLabel}</button>
            <div id="sortByDropdown" className="dropdown-content">
                {
                    sortByList.map((sortBy) => {
                        return <div key={sortBy.userFacingLabel}><button onClick={() => {
                            setSortBy(sortBy)
                        }}>{sortBy.userFacingLabel}</button></div>
                    })                    
                }
                <button onClick={() => setOrder("desc")}>DESC</button>
                <button onClick={() => setOrder("asc")}>ASC</button>
            </div>
        </div>
    )
}

export default TopicArticlesSearch