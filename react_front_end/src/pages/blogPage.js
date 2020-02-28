import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {getAllBlogPosts} from "../helper/requestMethods" 


const BlogPage = () => {
    const [localBlogPostslist,setBlogPostslist] = useState([])
    const blogPostsList = useSelector(state => state.blogPosts.dataList)
    const dispatch = useDispatch()
 
    getAllBlogPosts().then( resolve => {console.log(resolve)})

    const fetchPostsData = async() => {
        try{
            const data = await getAllBlogPosts()
            dispatch({type:"UPLOAD_BLOGPOSTS",payload:data})
            console.log(data)
        }catch(err){
            console.log(err)
        }
       
    }
    fetchPostsData()
   

    
    useEffect(() => {
        console.log(blogPostsList)
        return () => {
        };
    }, [localBlogPostslist])
    return(
        <div>
            Blog page
        </div>
    )
}

export default BlogPage