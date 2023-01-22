import {applyMiddleware, combineReducers, createStore} from 'redux';
import { calendar } from './reducers/calendar';
import { loginReducer } from './reducers/authReducers';
import thunk from 'redux-thunk';
import { app } from './reducers/app';

const rootReducer = combineReducers({
    calendar:calendar,
    userLogin: loginReducer,
    appState: app
})

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...[thunk])
)


export default store;