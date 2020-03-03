import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBlogPosts } from "../helper/requestMethods";
import MarkdownArea from "../components/markdownArea";

import { Link } from "react-router-dom";

import { Card,Row } from "antd";

const BlogPage = () => {
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

  return (
    <div>
      {!(dataList && dataList.length > 0) ? (
        <div> No data </div>
      ) : (
        dataList.map((item, index) => {
          return (
              <Row type="flex" justify="center">
            <Card title={item.title} style={{width:"50%"}} key={index}>
              <Link to={"/posts/" + item._id}>{item.title}</Link>
            </Card>
            </Row>
          );
        })
      )}
    </div>
  );
};

export default BlogPage;
