import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";

import {
  getABlogPost,
  updateABlogPost,
  createABlogPost
} from "../helper/requestMethodsToServer";
import { fetchTags } from "../helper/commonMethodsInClient";
import {useHistory} from 'react-router-dom'

import { Row, Button, Input, label, Col, Select, Divider,message } from "antd";

export const EditBlogPostPage = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [newFileTitle, setFileTitle] = useState("");

  const [text, setText] = useState("Text Area");
  
  const [title, setTitle] = useState("Title");
  const { userId, token } = useSelector(state => state.auth);

  const tags = useSelector(state => state.tags.tagsList);

  const [selectedTags, setSelectedTags] = useState("");

  const post_id = useParams().id;

  const [currentBlogPost, setCurrentBlogPost] = useState({});
  const [newFileFlag, setNewFileFlag] = useState(false);

  const handleChange = e => {
    setText(e.target.value);
  };

  useEffect(() => {
    let isCancelled = false;
    if (post_id === "new") {
      let runAsync = async () => {
        try {
          if (!isCancelled) {
            await fetchTags(dispatch);
            setSelectedTags(tags)
            setLoaded(true)
          }
        } catch (err) {
          if (!isCancelled) {
            throw err;
          }
        }
      };
      runAsync();

      setNewFileFlag(true);
    } else if (!isCancelled && post_id !== "new") {
      let runAsync = async () => {
        try {
          if (!isCancelled) {
            await fetchTags(dispatch);
            
            const post = await getABlogPost(post_id);
            console.log(post)
            if (post) {
              setCurrentBlogPost(post);
              setText(post.text);
              setTitle(post.title);
              setSelectedTags(post.tags)
            }
            setLoaded(true)
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
    if (selectedTags.length < 1 || !title ) {
        message.warn("Tag or Title can't be empty");
        return;
      }
    try {
      const result = await updateABlogPost(
        { id: post_id, title, text },
        { userId, token },
        selectedTags
      );
      setReload(!reload);
    } catch (err) {}
  };

  const handleCreate = async () => {
    if (selectedTags.length < 1 || !title ) {
        message.warn("Tag or Title can't be empty");
        return;
      }
    try {
      const result = await createABlogPost(
        { fileTextData: text, title },
        { userId, token },
        selectedTags
      );
      
      if(result){
          history.push("/admincenter")
      }
    } catch (err) {
      throw err;
    }
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleCancel = e => {
      history.push("/admincenter")
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
            <label style={{ display: "block" }} htmlFor="title">
              {" "}
              Title
            </label>
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

        <Col span={4}></Col>
      </Row>
      <Row style={{ marginTop: "1%" }}>
        <Input.TextArea
          onChange={e => handleChange(e)}
          value={text}
        ></Input.TextArea>
      </Row>
      {loaded && (
          <Fragment>
            <Col span={3}>
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Tags"
                mode="multiple"
                value={selectedTags}
                onSelect={label => {
                  if (selectedTags.indexOf(label) < 0) {
                    setSelectedTags([...selectedTags, label]);
                  }
                }}
                onDeselect={label => {
                  setSelectedTags(
                    selectedTags.filter(element => element !== label)
                  );
                }}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                  </div>
                )}
              >
                {tags.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Fragment>)}

      <Row style={{ marginTop: "10px" }} type="flex" justify="space-around">
        {newFileFlag ? (
          <Button type="primary" onClick={handleCreate}>Create</Button>
        ) : (
          <Button type="primary" onClick={handleUpdate}>
            Edit
          </Button>
        )}

        <Button type="danger" onClick={handleCancel} >Cancel</Button>
      </Row>
    </Fragment>
  );
};

export default EditBlogPostPage;
