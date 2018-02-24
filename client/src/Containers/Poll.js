import React from 'react';
import PollHeader from '../Components/PollHeader';
import PollOptions from '../Components/PollOptions';
import PollCharts from '../Components/PollCharts';
import { Redirect } from "react-router-dom";

class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {poll: undefined, didVote: false, redirect: false, user: false};
        this.handleVote = this.handleVote.bind(this);
    }

    componentDidMount() {
        this.checkPoll();
        const self = this;
        this.interval = setInterval(() => {
            self.checkPoll()
        }, 5000);
    }

    checkPoll() {
        const id = this.props.location.pathname.slice(6);
        const data = JSON.stringify({pollID: id});
        fetch('/polls/getPoll', {
            method: 'post',
            credentials: 'include',
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            if(json.poll === "Poll not found") {
                this.setState({redirect: true});
            } else {
                this.setState({poll: json.poll, didVote: json.didVote, user: json.user});
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleVote(e) {
        e.preventDefault();
        const data = new URLSearchParams(new FormData(e.target));
        e.target.reset();
        data.append('pollID', this.state.poll._id)
        fetch('/polls/updatePoll', {
            method: 'post',
            credentials: 'include',
            body: data
        }).then(res => {
            return res.json();
        }).then(json => {
            if(json.poll === "Poll not found") {
                this.setState({redirect: true});
            } else if(typeof json.poll === "string") {
                alert(json.poll);
            } else {
                this.setState({poll: json, didVote: true})
            }
        })
    }

    render() {
        const { poll, didVote, redirect, user } = this.state;
        return (
            <div className='text-center poll'>
                {redirect && <Redirect to='/' />}
                <PollHeader user={user} didVote={didVote} />
                {!poll && <h4>Loading Poll...</h4>}
                {poll && <div>
                    {!didVote && <PollOptions poll={poll} handleVote={this.handleVote} user={user}/>}
                    {didVote && <PollCharts poll={poll} />}
                </div>}
            </div>
        )
    }
}

export default Poll;