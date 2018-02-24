import React from 'react';
import PollList from '../Components/PollList';
import InfoHeader from '../Components/InfoHeader';
import { connect } from 'react-redux';

class GetPolls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, polls: null};
    }
    
    componentDidMount() {
        fetch('/polls/getPolls', {
            method: 'get',
            credentials: 'include'
        }).then(res => {
          return res.json();
        }).then(json => {
            this.setState({loading: false, polls: json});
        })
    }

    render() {

        return (
            <div>
                <InfoHeader user={this.props.user} />
                {this.state.loading && <p>Loading Polls...</p>}
                {!this.state.loading && <PollList polls={this.state.polls} user={false} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

GetPolls = connect(mapStateToProps, null)(GetPolls);

export default GetPolls;