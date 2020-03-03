import React, { Fragment, useEffect, useState } from "react";
import { List, Button, Modal, message } from "antd";

import { useSelector, useDispatch } from "react-redux";

import { fetchPostsData } from "../helper/CommonMethodsInClient";

import { useHistory, Link } from "react-router-dom";

import { removeABlogPost } from "../helper/requestMethodsToServer";

export const AdminPostsList = props => {
  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);

  const [removedPostId, setRemovedPostId] = useState("");
  const { userId, token } = useSelector(state => state.auth);
  const dataList = useSelector(state => state.blogPosts.dataList);

  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
   
    
    fetchPostsData(dispatch);
    
    return () =>{abortController.abort()}
  }, []);

  const removeBlogPost = id => {
    setRemovedPostId(id);
    setModalVisible(true);
  };
  const handleOK = async () => {
    try {
      const result = await removeABlogPost(removedPostId, { token, userId });
      if (result) {
        message.info("Success");
      } else {
        message.info(result);
      }
    } catch (err) {
      throw err;
    }

    setModalVisible(false);
    fetchPostsData(dispatch);
  };
  const handleCancel = () => {
    setRemovedPostId("");
    setModalVisible(false);
  };
  console.log(dataList);
  return (
    <div style={{ width: "100%" }}>
      <List
        className="admin_blogPosts_list"
        itemLayout="horizontal"
        dataSource={dataList}
        renderItem={item => (
          <List.Item actions={<Button>edit</Button>}>
            <List.Item.Meta title={item.title} />
            <List.Item.Meta title={item.tags.join(",")} />
            <Link to={"/adminCenter/editPosts/" + item._id}>
              <Button type="primary">Edit</Button>
            </Link>
            <Button type="danger" onClick={() => removeBlogPost(item._id)}>
              Remove
            </Button>
          </List.Item>
        )}
      ></List>
      {modalVisible && (
        <Modal visible={modalVisible} onOk={handleOK} onCancel={handleCancel}>
          <p>Do you want to remove this blogpost?</p>
        </Modal>
      )}
    </div>
  );
};

export default AdminPostsList;
