import React,{useEffect} from 'react'
import ReactMarkdown from 'react-markdown'

import { useLocation,useParams } from 'react-router-dom'

import {useSelector} from 'react-redux'

export const BlogPostPage = (props) => {
  
    const dataList = useSelector(state => state.blogPosts.dataList)
    const post_id = useParams().id
    let text;
    
    const data = dataList.filter(e => (e._id===post_id))[0]
    text = data.text
    

    
    console.log(text)
    
    return(
        
        
        
    
        <ReactMarkdown source={text}></ReactMarkdown>
    )
}

export default BlogPostPage