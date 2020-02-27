import React, { useState } from "react";
import { Upload, Button, Icon,message } from "antd";
import { toBase64,fromBase64,fromFile } from "../helper/fileReader";
import MarkdownArea from "./markdownArea";
const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [test, setTest] = useState("hello");


  const handleUpload = async () => {
    const sentFiles = []

    
    try{
        for (let file of fileList) {
            const based64File = await toBase64(file)
            const fileObject = {fileData:based64File,fileName:file.name}
            sentFiles.push(fileObject)
        }
        let aFile = fromBase64(sentFiles[0].fileData,sentFiles[0].fileName)
      
        const textFile = await fromFile(aFile)
       
        setTest(textFile)
        
   
        await sendFile(sentFiles)
        
        setUploading(true);

        
   
    }catch(err){
        throw err
    }
   


  };

  const sendFile = async (sentFiles)=>{
    fetch("http://localhost:8000/graphql",{
        method:"POST",
        body: JSON.stringify({ sentFiles }),
        headers: {
          "Content-Type": "application/json"
        },
    }).then().catch(err => {
        setUploading(false)
        setFileList([])
        message.error(err)
    })
  }

  const onRemove = file => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();

    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = file => {
    setFileList([...fileList, file]);
  };




const uploadProps = {
    onRemove,
    beforeUpload,
    fileList
}
  return (
    <div>
      <Upload {...uploadProps}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
      <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>

        {/* <MarkdownArea input={test}></MarkdownArea> */}
    </div>
  );
};

export default UploadButton;
