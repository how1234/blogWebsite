import {getAllBlogPosts,getAllTags } from './requestMethodsToServer'
import {useDispatch} from 'react-redux'


export const fetchPostsData = async (dispatch) => {
    try {
      const serverData = await getAllBlogPosts();
      dispatch({
        type: "RELOAD_BLOGPOSTS",
        payload: serverData.data.blogPosts
      });
     
    } catch (err) {
      console.log(err);
    }
  };

export const fetchTags = async (dispatch) => {
    try {
      const tagsList = await getAllTags();
      dispatch({
        type: "RELOAD_TAGS",
        payload: tagsList.data.getAllTags
      });
    
    } catch (err) {
      throw err;
    }
  };