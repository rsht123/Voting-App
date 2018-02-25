import React from "react";
import PollList from './PollList';

class MyPolls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {polls: undefined};
        this.deletePoll = this.deletePoll.bind(this);
    }

    componentDidMount() {
        this.getUserPolls();
    }

    getUserPolls() {
        fetch('/polls/userPolls', {
            method: 'get',
            credentials: 'include'
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({polls: json});
        })
    }

    deletePoll(e) {
        const id = e.target.parentElement.id;
        const data = JSON.stringify({id: id});
        fetch('/polls/deletePoll', {
            method: 'post',
            credentials: 'include',
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            if(json === "User logged out.") {
                this.props.redirect();
            } else {
                this.getUserPolls();
            }
        })
    }

    render() {
        return (
            <div>
                {!this.state.polls && <p>Loading your polls...</p>}
                {this.state.polls && <PollList polls={this.state.polls} user={true} deletePoll={this.deletePoll} />}
            </div>
        )
    }
}

export default MyPolls;