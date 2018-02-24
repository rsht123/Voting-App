import { combineReducers } from "redux";

const user = (state = false, action) => {
    switch(action.type) {
        case "LOGIN":
        case "SET_USER":
            return action.name;
        case "LOGOUT":
            return false;
        default:
            return state;
    }
}

const loading = (state = false, action) => {
    switch(action.type) {
        case "LOADED":
        return true;
        default:
        return state;
    }
}

const votingApp = combineReducers({user, loading});

export default votingApp;