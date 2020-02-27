import React from 'react'
import ReactMarkdown from 'react-markdown'

export const MarkdownArea = (props) => {
    return(
        <ReactMarkdown source={props.input}></ReactMarkdown>
    )
}

export default MarkdownArea