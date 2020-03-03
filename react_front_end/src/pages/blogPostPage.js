import React,{useEffect,useState, Fragment} from 'react'
import ReactMarkdown from 'react-markdown'
import {Spin,Layout} from 'antd'
import { useHistory,useParams } from 'react-router-dom'

import {getABlogPost} from '../helper/requestMethodsToServer'

export const BlogPostPage = () => {
    const history = useHistory()
    const [postText,setPostText] = useState('')
    const [loaded,setLoaded] = useState(false)
    const post_id = useParams().id

    const fetchData = async () => {
        try{
            const blogPostData = await getABlogPost(post_id)
            if(blogPostData) {
                setPostText(blogPostData.text)
            }else{
               history.push('/404')
            }
            
        }catch(err){
            throw err
        }
    }


   
    useEffect( ()=>{
        fetchData()
    },[])
      
    return(
        <Fragment>

        
            {loaded ?  (<Spin style={{display:"block",margin:"auto"}}/>  ): (<ReactMarkdown source={postText} />)}
       
       </Fragment>
        
    
        
    )
}

export default BlogPostPage