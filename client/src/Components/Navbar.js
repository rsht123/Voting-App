import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        this.checkUser();
    }

    componentWillUpdate() {
        this.checkUser();
    }

    checkUser() {
        fetch('/auth/user', {
            method: 'get',
            credentials: 'include'
        }).then(res => {
            return res.json()
        }).then(json => {
            this.props.dispatch(actions.setUser(json));
            this.props.dispatch(actions.loadState());
        });
    }

    logoutUser() {
        fetch('/auth/logout', {
            credentials: 'include'
        }).then(res => {
            this.props.dispatch(actions.logoutUser())
        });
    }

    render() {
        const user = this.props.user;
        return (
            <nav>
                <div className='navbar'>
                    <h6 className='navbar-brand'><a href='/'>FCC Polls</a></h6>
                    <ul className='nav'>
                        {!this.props.loaded && <li>Loading...</li>}
                        {this.props.loaded && <div> 
                            <li className='left'><NavLink exact to='/'>Home</NavLink></li>
                        {user && <li><span><NavLink to='/dashboard' activeClassName='active' >{user}</NavLink></span>
                        <span><a onClick={this.logoutUser}>Logout</a></span></li>}
                        {!user && <li><span><NavLink to='/login'>Login</NavLink></span>
                        <span><NavLink to='/signup'>Sign Up</NavLink></span></li>}
                        </div>}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loaded: state.loading
    }
}

Navbar = withRouter(connect(mapStateToProps, null)(Navbar));

export default Navbar;