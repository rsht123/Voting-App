import React from 'react';

class NewPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: false};
        this.addOption = this.addOption.bind(this);
        this.submit = this.submit.bind(this);
    }

    addOption(e) {
        e.preventDefault();
        const inputs = document.getElementsByName('options');
        let inputValues = [];
        for(var i = 0; i < inputs.length; i++) {
            inputValues.push(inputs[i].value);
        }
        const html = "<input type='text' placeholder='Additional Option' name='options' autoComplete='off' />";
        document.getElementById('options').innerHTML += html;
        for(let i = 0; i < inputs.length; i++) {
            if(inputValues[i]) {
                inputs[i].value = inputValues[i];
            }
        }
    }

    componentDidMount() {
        document.getElementsByName('title')[0].focus();
    }

    componentDidUpdate() {
        const html = "<p><b>Options</b></p><input type='text' placeholder='An Option' name='options' autoComplete='off' /><input type='text' placeholder='Another Option' name='options' autoComplete='off' />"
        document.getElementById('options').innerHTML = html;
        document.getElementsByName('title')[0].value = "";
        document.getElementsByName('title')[0].focus();
    }

    submit(e) {
        e.preventDefault();
        const inputs = document.getElementsByName('options');
        let inputValues = [];
        for(var i = 0; i < inputs.length; i++) {
            inputValues.push(inputs[i].value);
        }
        inputValues = inputValues.filter(input => {
            return input !== '';
        })
        console.log(inputValues);
        if(document.getElementsByName('title')[0].value === "") {
            console.log('title');
            return this.setState({message: "Cant create poll without a Title"})
        } else if(inputValues.length === 0) {
            console.log('options');
            return this.setState({message: "Poll needs atleast one option"});
        } else {
            console.log('sent');
            const data = new URLSearchParams(new FormData(document.getElementById('newpoll')));
            fetch('/polls/addPoll', {
                method: 'post',
                credentials: 'include',
                body: data
            }).then(res => {
                return res.json();
            }).then(json => {
                if(json === "User logged out.") {
                    this.props.redirect();
                } else {
                    this.setState({message: json});
                }
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <h4>New Poll</h4>
                <form id='newpoll'>
                    {this.state.message && <p>{this.state.message}</p>}
                    <div className='form-group'>
                    <p><b>Name your Poll</b></p>
                    <input type='text' placeholder='Title' autoComplete='off' name='title' />
                    </div>
                    <div id='options' className='form-group'>
                        <p><b>Options</b></p>
                        <input type='text' placeholder='An Option' name='options' autoComplete='off' />
                        <input type='text' placeholder='Another Option' name='options' autoComplete='off' />
                    </div>
                    <button className='btn btn-success' onClick={this.submit}>Submit Poll</button>
                    <button className='btn btn-info' onClick={this.addOption}>Add Option</button>
                </form>
            </div>
        )
    }
}

export default NewPoll;