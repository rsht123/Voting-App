import React from 'react';

const Option = ({ item }) => {
    return (
        <div  className="option-container form-group">
            <input type='radio' name="selected" value={item.name} id={item.name} />
            <label htmlFor='selected'>{item.name}</label>
        </div>
    )
}

class PollOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addOption: false};
        this.addOption = this.addOption.bind(this);
    }

    addOption(e) {
        e.preventDefault();
        this.setState({addOption: !this.state.addOption});
    }

    render() {
        const options = this.props.poll.options.map((item, i) => {
            return <Option key={item.name + '' + i} item={item} />
        })
        return (
            <div>
                <h4>{this.props.poll.title}</h4>
                <form className="option-form" onSubmit={this.props.handleVote}>
                    {options}
                    {this.state.addOption && <input type='text' placeholder='Add custom option' name='custom' autoComplete='off' className='option-container' />}<br />
                    <button className='btn btn-success'>Vote</button>
                    {this.props.user && <button className='btn btn-info' onClick={this.addOption}>Add custom option</button>}
                </form>
            </div>
        )
    }
}

export default PollOptions;