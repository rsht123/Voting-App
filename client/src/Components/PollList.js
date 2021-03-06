import React from 'react';
import { NavLink } from "react-router-dom";

const PollList = ({ polls, user, deletePoll }) => {
    const allPolls = polls.map(poll => {
        return <li key={poll._id} id={poll._id} className={user ? 'user' : ''} >
                <NavLink to={`/poll/${poll._id}`}>{poll.title}</NavLink>
                {user && <button className='btn btn-danger' onClick={deletePoll}>Delete</button>}
            </li>
    })
    const isPolls = polls.length > 0 ? true : false;
    return (
        <div className='container'>
        {!user && <h4>All polls by campers</h4>}
        {user && <h4>Your polls</h4>}
        {!isPolls && <p>You have no polls. Go to the New Poll tab to create a new one.</p>}
        {isPolls && <ul className='list-unstyled poll-list'>
            {allPolls}
        </ul>}
        </div>
    )
}

export default PollList;