import {applyMiddleware, combineReducers, createStore} from 'redux';
import { calendar } from './reducers/calendar';
import { loginReducer } from './reducers/authReducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    calendar:calendar,
    userLogin: loginReducer
})

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...[thunk])
)


export default store;