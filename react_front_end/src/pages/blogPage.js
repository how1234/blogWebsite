import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBlogPosts } from "../helper/requestMethods";
import MarkdownArea from "../components/markdownArea";

import { Link } from "react-router-dom";

import { Card } from "antd";

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
            <Card title={item.title} key={index}>
              <Link to={"/posts/" + item._id}>{item.title}</Link>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default BlogPage;
