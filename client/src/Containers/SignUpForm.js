import React from 'react';
import InfoHeader from '../Components/InfoHeader';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: false, redirect: false};
    }

    submit() {
        const data = new URLSearchParams(new FormData(document.getElementById('signupForm')))
        fetch('/auth/signup', {
            method: 'post',
            body: data
        }).then(res => {
            return res.json();
        }).then(json => {
            if(json.message === "Success") {
                this.setState({redirect: true});
            } else {
                this.setState({message: json.message});
            }
        })
    }

    componentDidMount() {
        this.refs.name.focus();
    }

    componentDidUpdate() {
        document.getElementById('signupForm').reset();
        this.refs.name.focus();
    }

    render() {
        return (
            <div>
                {this.props.loading && this.props.user && <Redirect to='/dashboard' />}
                {this.state.redirect && <Redirect to='/login' />}
                <InfoHeader user={false} />
                <div id='signupContainer'>
                    <h4>Sign Up</h4>
                    <form id='signupForm' onSubmit={(e) => {
                        e.preventDefault();
                        this.submit();
                    }} >
                        {this.state.message && <p>{this.state.message}</p>}
                        <div className='form-group'>
                        <label htmlFor="name">Name</label>
                        <input type='text' placeholder="Name" name='name' ref='name' autoComplete='off' />
                        </div>
                        <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input type='text' placeholder="Username" name='username' ref='username' autoComplete="off" />
                        </div>
                        <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type='text' placeholder="Email" name='email' ref='email' autoComplete="off" />
                        </div>
                        <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type='password' placeholder="Password" name='password' ref='password' />
                        </div>
                        <div className='form-group'>
                        <label htmlFor="confPassword">Password</label>
                        <input type='password' placeholder="Confirm Password" name='confPassword' ref='confPassword'/>
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

SignUpForm = connect(mapStateToProps, null)(SignUpForm);

export default SignUpForm;