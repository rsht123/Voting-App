import React from 'react';

const InfoHeader = ({ user }) => (
    <div className='info-container text-center'>
        <h1>FCC Polls</h1>
        <p>FCC voting app with live results.</p>
        {!user && <p>Sign in to create custom polls and share with your friends.</p>}
        {user && <p>Go to your Dashboard to see your polls or create a new one.</p>}
    </div>
)

export default InfoHeader;