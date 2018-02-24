import React from 'react';

const PollHeader = ({ user, didVote }) => (
    <div className='info-container'>
        <h1>FCC Polls</h1>
        <p>FCC Voting app with live results.</p>
        {!didVote && <div>
            {!user && <p>Dont like an option? Sign In to create your custom option.</p>}
            {user && <p>Dont like an option? Add your own custom option.</p>}
        </div>}
        {didVote && <div>
            <p>Poll results with Live Updating.</p>
        </div>}
    </div>
)

export default PollHeader;