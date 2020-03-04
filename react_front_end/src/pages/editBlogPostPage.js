import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

import {
  getABlogPost,
  updateABlogPost
} from "../helper/requestMethodsToServer";

import { Row, Button, Input, label, Col } from "antd";
export const EditBlogPostPage = props => {
  const [reload, setReload] = useState(false);
  const [text, setText] = useState("Text Area");
  const [title, setTitle] = useState("Title");
  const { userId, token } = useSelector(state => state.auth);
  const post_id = useParams().id;

  const [currentBlogPost, setCurrentBlogPost] = useState({});
  const [newFileFlag, setNewFileFlag] = useState(false);

  const handleChange = e => {
    setText(e.target.value);
  };

  useEffect(() => {
    console.log(post_id);
    let isCancelled = false;
    if (post_id === "new") {
      setNewFileFlag(true);
      return;
    } else if (!isCancelled && post_id !== "new") {
      let runAsync = async () => {
        try {
          if (!isCancelled) {
            const post = await getABlogPost(post_id);
            if (post) {
              setCurrentBlogPost(post);
              setText(post.text);
              setTitle(post.title);
            }
          }
        } catch (err) {
          if (!isCancelled) {
            throw err;
          }
        }
      };
      runAsync();
    }

    return () => {
      isCancelled = true;
    };
  }, [post_id, reload]);

  const handleUpdate = async e => {
    try {
      const result = await updateABlogPost(
        { id: post_id, title, text },
        { userId, token }
      );
      setReload(!reload);
    } catch (err) {}
  };

  const handleTitleChange = (e) => {
      setTitle(e.target.value)
  }
  return (
    <Fragment>
      <ReactMarkdown
        className="markdown_div"
        style={{ overflow: "hidden" }}
        source={text}
      ></ReactMarkdown>

      <Row style={{ marginTop: "2%" }} type="flex" justify="center">
      
        <Row gutter={15}>
            <Col span={6}>
            <label style={{display:"block"}} htmlFor="title"> Title</label>
            </Col>
            <Col span={12}>
            <Input
            id="title"
            onChange={e => handleTitleChange(e)}
            placeholder="title"
            value={title}
          ></Input>
            </Col>
        </Row>
      
     
        <Col span={4}>
          
        </Col>
      </Row>
      <Row style={{ marginTop: "1%" }}>
        <Input.TextArea
          onChange={e => handleChange(e)}
          value={text}
        ></Input.TextArea>
      </Row>

      <Row style={{ marginTop: "10px" }} type="flex" justify="space-around">
        {newFileFlag ? (
          <Button type="primary">Create</Button>
        ) : (
          <Button type="primary" onClick={handleUpdate}>
            Edit
          </Button>
        )}

        <Button type="danger">Cancel</Button>
      </Row>
    </Fragment>
  );
};

export default EditBlogPostPage;
