import React, { useState, Fragment, useEffect } from "react";
import { Upload, Button, Icon, Col, Select, Divider, Input,Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fileToText } from "../helper/fileReader";

import {
  uploadSingleBlogPost,
  getAllBlogPosts,
  getAllTags,
  createNewTag
} from "../helper/requestMethods";

const UploadWidgits = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { userId, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("new tag");

  const fetchTags = async () => {
    try {
      const tagsList = await getAllTags();

      setTags(tagsList.data.getAllTags.map(element => element.name));
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);

 
  const createNewTag = async () => {
    try {
      const result = await createNewTag(newTagName, { token, userId });
    } catch (err) {
      throw err;
    }
  };

  const handleInputChange = e => {
    e.preventDefault();
    setNewTagName(e.target.value);
  };

  const handleInputClick = e => {
    console.log(e)
    e.preventDefault();

  };
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
          const result = await uploadSingleBlogPost(sentFiles[i], {
            token,
            userId
          });
          const serverData = await getAllBlogPosts();
          dispatch({
            type: "RELOAD_BLOGPOSTS",
            payload: serverData.data.blogPosts
          });
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
      <Row type="flex" justify="space-around" >
      <Col span={4}>
        <Upload {...uploadProps}>
          <Button className="upload_file_btn">
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </Col>

      <Col span={4}>
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
      </Row>
      {!(fileList && fileList.length) > 0 && (
        <Row type="flex" justify="space-around" >
          <Select
            allowClear
            style={{ width: 240}}
            placeholder="Tags"
            dropdownRender={menu => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                  onClick={ (e) => handleInputClick(e)}
                >
                  <Input
                    type="text"
                   
                    value={newTagName}
                    onChange={handleInputChange}
                    
                  />
                  <a
                    style={{
                      flex: "none",
                      padding: "8px",
                      display: "block",
                      cursor: "pointer"
                    }}
                    
                  >
                    <Icon type="PlusCircleOutlined" /> Add Tags
                  </a>
                </div>
              </div>
            )}
          >
            {tags.map(item => (
              <Select.Option key={item}>{item}</Select.Option>
            ))}
          </Select>
        </Row>
      )}
    </Fragment>
  );
};

export default UploadWidgits;
