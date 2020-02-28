import React, { useState } from "react";
import { Upload, Button, Icon, message } from "antd";
import { useSelector } from "react-redux";
import { toBase64, fromBase64, fileToText } from "../helper/fileReader";
import MarkdownArea from "./markdownArea";

import { serialize, deserialize } from "bson";
import { createBlogPost_requestBody } from "../helper/graphql_queries";

const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [test, setTest] = useState("hello");
  const { userId, token } = useSelector(state => state);

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
      console.log(sentFiles)
      for (let i=0;i<sentFiles.length; i++) {
        try {
          await sendFile(sentFiles[i]);
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

  const sendFile = async sentFile => {
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(createBlogPost_requestBody(sentFile.title, sentFile.fileTextData)),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        "userId": userId
      }
    })
      .then(resolve => resolve)
      .catch(err => {
        message.error(err);
      });
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
