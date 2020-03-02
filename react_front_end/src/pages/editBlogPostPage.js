import React, { Fragment,useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'


import {Row,Button,Input} from 'antd' 
export const EditBlogPostPage = (props) => {
    const [text,setText] = useState('Text Area')
    const post_id = useParams().id

    const [newFileFlag,setNewFileFlag] = useState(false)

    const handleChange = (e) =>{
     
        setText(e.target.value)
    }

    useEffect(() => {
        if(post_id === "new"){
            setNewFileFlag(true)
        }

    }, [])
    return(
        <Fragment>
            
            <ReactMarkdown className="markdown_div"  style={{overflow:"hidden"}} source={text}></ReactMarkdown>

        
        <Row style={{marginTop:"10%"}}>
            <Input.TextArea onChange={ e => handleChange(e)}></Input.TextArea>
        </Row>
        
        
        
        <Row style={{marginTop:"10px"}}type="flex" justify="space-around">
            {newFileFlag ? <Button type="primary">
                Create
            </Button>: <Button type="primary">
                Edit
            </Button>}
            


            <Button type="danger">
                Cancel
            </Button>
        </Row>
        </Fragment>
    )
}

export default EditBlogPostPage