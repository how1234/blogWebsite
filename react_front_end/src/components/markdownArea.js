import React from 'react'
import ReactMarkdown from 'react-markdown'

import { useLocation } from 'react-router-dom'

export const MarkdownArea = (props) => {
    console.log( useLocation())
    return(
        

    
        <ReactMarkdown source={props.input}></ReactMarkdown>
    )
}

export default MarkdownArea