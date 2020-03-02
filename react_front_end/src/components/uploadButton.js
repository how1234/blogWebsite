import React, { useState, Fragment } from "react";
import { Upload, Button, Icon, message, Row, Col } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { toBase64, fromBase64, fileToText } from "../helper/fileReader";

import { uploadSingleBlogPost,getAllBlogPosts } from "../helper/requestMethods";

const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { userId, token } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const handleUpload = async () => {
    const sentFiles = [];

    try {
      for (let file of fileList) {
        let fileTextData = await fileToText(file);
        let title = file.name;
        sentFiles.push({ fileTextData, title });
      }

      setUploading(true);

      for (let i = 0; i < sentFiles.length; i++) {
        try {
          const result = await uploadSingleBlogPost(sentFiles[i], { token, userId });
          const serverData = await getAllBlogPosts();
          dispatch({
            type: "RELOAD_BLOGPOSTS",
            payload: serverData.data.blogPosts
          });
          console.log(result)
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
    <Fragment>
      <Col span={6}>
        <Upload {...uploadProps}>
          <Button
           className="upload_file_btn">
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </Col>

      <Col span={6}>
        <Button
          className="trigger_upload_btn"
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </Col>
    </Fragment>
  );
};

export default UploadButton;
