import {combineReducers} from 'redux'
import auth from './authReducer'
import blogPosts from './blogsReducer'
import pageData from './pageReducer'
import tags from './tagsReducer'
export default combineReducers({
    auth,
    blogPosts,
    pageData,
    tags    
})