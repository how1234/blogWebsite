import React, { Fragment, useEffect, useState } from "react";
import { List, Button, Modal, message } from "antd";

import { useSelector, useDispatch } from "react-redux";

import { getAllBlogPosts } from "../helper/requestMethods";

import { useHistory, Link } from "react-router-dom";

import { removeABlogPost } from "../helper/requestMethods";

export const AdminPostsList = props => {
  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);

  const [removedPostId, setRemovedPostId] = useState("");
  const { userId, token } = useSelector(state => state.auth);
  const dataList = useSelector(state => state.blogPosts.dataList);

  const dispatch = useDispatch();

  const fetchPostsData = async () => {
    try {
      const serverData = await getAllBlogPosts();
      dispatch({
        type: "RELOAD_BLOGPOSTS",
        payload: serverData.data.blogPosts
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  const removeBlogPost = id => {
    setRemovedPostId(id);
    setModalVisible(true);
  };
  const handleOK = async () => {
    try {
      const result = await removeABlogPost(removedPostId,{ token, userId });
      if (result) {
        message.info("Success");
      } else {
        message.info(result);
      }
    } catch (err) {
      throw err;
    }

    setModalVisible(false);
    fetchPostsData();
  };
  const handleCancel = () => {
    setRemovedPostId("");
    setModalVisible(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <List
        className="admin_blogPosts_list"
        itemLayout="horizontal"
        dataSource={dataList}
        renderItem={item => (
          <List.Item actions={<Button>edit</Button>}>
            <List.Item.Meta title={item.title} />

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
