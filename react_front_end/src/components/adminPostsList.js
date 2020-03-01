import React, { Fragment, useEffect, useState } from "react";
import { List, Button, Modal } from "antd";

import { useSelector, useDispatch } from "react-redux";

import { getAllBlogPosts } from "../helper/requestMethods";

import { useHistory, Link } from "react-router-dom";
export const AdminPostsList = props => {
  const history = useHistory();

  const [modalVisible,setModalVisible] = useState(false)
  const [dataList, setDataList] = useState([]);
  const existedList = useSelector(state => state.blogPosts.dataList);

  const dispatch = useDispatch();

  const fetchPostsData = async () => {
    try {
      const serverData = await getAllBlogPosts();
      dispatch({ type: "FETCH_BLOGPOSTS", payload: serverData.data.blogPosts });
      setDataList(serverData.data.blogPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (existedList && existedList.length) {
      setDataList(existedList);
      console.log(dataList);
    } else {
      fetchPostsData();
    }
  }, []);

  
  const removeBlogPost = (id) => {
 
    setModalVisible(true)
  }
  const handleOK = () => {
      setModalVisible(false)
      
  }
  const handleCancel = () => {
    setModalVisible(false)
}


  return (
    <div style={{ width: "100%" }}>
      <List
        className="admin_blogPosts_list"
        itemLayout="horizontal"
        dataSource={dataList}
        renderItem={item => (
          <List.Item title="123" actions={<Button>edit</Button>}>
            <List.Item.Meta title={item.title} />

            <Link to={"/adminCenter/editPosts/"+ item._id}>
              <Button type="primary">Edit</Button>
            </Link>
            <Button type="danger" onClick={ () =>removeBlogPost(item._id)}>Remove</Button>
          </List.Item>
        )}
      ></List>
      {modalVisible&&<Modal
      visible={modalVisible}
      onOk={handleOK}
      onCancel={handleCancel}>
          <p>Do you want to remove this blogpost?</p>
      </Modal>}
    </div>
  );
};

export default AdminPostsList;
