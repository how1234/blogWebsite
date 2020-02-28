import {combineReducers} from 'redux'
import auth from './authReducer'
import blogPosts from './blogsReducer'

export default combineReducers({
    auth,
    blogPosts
})