import React,{useState} from 'react'
import {Upload,Button,Icon} from 'antd'

const UploadButton = () => {
    const [fileList,setFileList] = useState([])

    const handleChange = info => {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-3)

        fileList = fileList.map(file => {
            if(file.response) {
                file.url = file.response.url
            }
            return file
        })

        setFileList(fileList)
    }
    const uploadProps = {
        action: (file) => {
            fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify({id:"123",file}),
            headers: {
            "Content-Type": "application/json"
            }
        })
        },
        onChange:handleChange,
        multiple:true
    }
    return(
        <div>
            <Upload {...uploadProps} fileList={fileList}>
                <Button>
                    <Icon type="upload"/> Upload
                </Button>
            </Upload>
        </div>
    )
}

export default UploadButton

