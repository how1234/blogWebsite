import React, { useState } from "react";
import { Upload, Button, Icon, message } from "antd";
import { useSelector } from "react-redux";
import { toBase64, fromBase64, fileToText } from "../helper/fileReader";
import MarkdownArea from "./markdownArea";



import {uploadSingleBlogPost} from '../helper/requestMethods'

const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [test, setTest] = useState("hello");
  const { userId, token } = useSelector(state => state.auth);

  const handleUpload = async () => {
    const sentFiles = [];

    try {
      // for (let file of fileList) {
      //     const based64File = await toBase64(file)
      //     const fileObject = {fileData:based64File,fileName:file.name}
      //     sentFiles.push(fileObject)
      // }
      // let aFile = fromBase64(sentFiles[0].fileData,sentFiles[0].fileName)

      // const textFile = await fromFile(aFile)


      for (let file of fileList) {
        let fileTextData = await fileToText(file);
        let title = file.name;
        sentFiles.push({ fileTextData, title });
      }

    
      setUploading(true);
    
      for (let i=0;i<sentFiles.length; i++) {
        try {
          await uploadSingleBlogPost(sentFiles[i],{token,userId});
   
        } catch (error) {
          throw error;
        }
      }
      setUploading(false);
      setFileList([]);
    } catch (err) {
      throw err;
    }
  };


  const onRemove = file => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();

    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = file => {
    setFileList([...fileList, file]);
    return false;
  };

  const uploadProps = {
    onRemove,
    beforeUpload,
    fileList
  };
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
        {uploading ? "Uploading" : "Start Upload"}
      </Button>

      <MarkdownArea input={test}></MarkdownArea>
    </div>
  );
};

export default UploadButton;
