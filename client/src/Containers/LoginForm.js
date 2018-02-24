import React from 'react';
import InfoHeader from '../Components/InfoHeader';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: undefined, redirect: false};
    }

    submit() {
        const data = new URLSearchParams(new FormData(document.getElementById('loginForm')));
        fetch('/auth/login', {
            method: 'post',
            credentials: 'include',
            body: data
        }).then(res => {
            return res.json()
        }).then(json => {
            if(json.message === "Successful Login") {
                this.setState({redirect: true});
                this.props.dispatch(loginUser(json.user))
            } else {
                this.setState({message: json.message});
            }
        })
    }

    componentDidMount() {
        this.refs.username.focus();
    }

    componentDidUpdate() {
        this.refs.username.value = '';
        this.refs.password.value = '';
        this.refs.username.focus();
    }

    render() {
        return (
            <div>
                {this.props.loading && this.props.user && <Redirect to='/dashboard' />}
                {this.state.redirect && <Redirect to='/dashboard' />}
                <InfoHeader user={false} />
                <div id='loginContainer'>
                <h4>Login</h4>
                {this.state.message && <p>{this.state.message}</p>}
                <form id='loginForm' onSubmit={(e) => {
                    e.preventDefault();
                    this.submit();
                }}>
                    <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input type='text' placeholder="Username" name='username' ref='username' autoComplete="off" />
                    </div>
                    <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type='password' placeholder="Password" name='password' ref='password' />
                    </div>
                    <button type="submit" className='btn btn-primary'>Submit</button>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loading: state.loading
    }
}

LoginForm = connect(mapStateToProps, null)(LoginForm);

export default LoginForm;