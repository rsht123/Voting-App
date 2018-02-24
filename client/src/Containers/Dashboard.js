import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MyPolls from '../Components/MyPolls';
import NewPoll from '../Components/NewPoll';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mood: 'New Poll', redirect: false};
        this.handleClick = this.handleClick.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    handleClick(e) {
        const mood = e.target.innerHTML;
        this.setState({mood: mood})
    }

    redirect() {
        this.setState({redirect: true});
    }
    
    render() {
        return (
            <div className='dashboard text-center'>
                {this.state.redirect && <Redirect to='/login' />}
                {!this.props.username && this.props.loaded && <Redirect to='/login' />}
                <div className='dashboard-container'>
                    <h1>Dashboard</h1>
                    <p>What would you like to do?</p>
                    <span onClick={this.handleClick}>New Poll</span>
                    <span onClick={this.handleClick}>My Polls</span>
                </div>
                {this.state.mood === "New Poll" && <NewPoll redirect={this.redirect} />}
                {this.state.mood === "My Polls" && <MyPolls redirect={this.redirect} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user,
        loaded: state.loading
    }
}

Dashboard = connect(mapStateToProps, null)(Dashboard);

export default Dashboard;