import React from 'react'
import {useParams} from 'react-router-dom'

export const EditBlogPostPage = (props) => {
    const post_id = useParams().id
    return(
        <div>
            {post_id}
        </div>
    )
}

export default EditBlogPostPage