import { combineReducers } from 'redux'
import home from './home'
import area from './area'

const reducers=combineReducers({
    home,
    area,
});
console.log(reducers)
export default reducers
