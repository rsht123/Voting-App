import React from 'react';
import { NavLink } from "react-router-dom";

const PollList = ({ polls, user, deletePoll }) => {
    const allPolls = polls.map(poll => {
        return <li key={poll._id} id={poll._id} className={user ? 'user' : ''} >
                <NavLink to={`/poll/${poll._id}`}>{poll.title}</NavLink>
                {user && <button className='btn btn-danger' onClick={deletePoll}>Delete</button>}
            </li>
    })
    return (
        <div className='container'>
        {!user && <h4>All polls by campers</h4>}
        {user && <h4>Your polls</h4>}
        <ul className='list-unstyled poll-list'>
            {allPolls}
        </ul>
        </div>
    )
}

export default PollList;