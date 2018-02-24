import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import votingApp from './reducers';
import App from './Components/App';
import Navbar from './Components/Navbar';
import LoginForm from './Containers/LoginForm';
import SignUpForm from './Containers/SignUpForm';
import Dashboard from './Containers/Dashboard';
import Poll from './Containers/Poll';
import Footer from './Components/Footer';

const store = createStore(votingApp);

const Root = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Navbar />
                <Route exact path='/' component={App} />
                <Route path='/login' component={LoginForm} />
                <Route path='/signup' component={SignUpForm} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/poll/:id?' component={Poll} />
                <Footer />
            </div>
        </Router>
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));