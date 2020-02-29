import React, { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import { getAllBlogPosts } from "../helper/requestMethods";
import MarkdownArea from "../components/markdownArea";

import { Link } from 'react-router-dom'


import { Card } from "antd";

const BlogPage = () => {
  const [dataList, setDataList] = useState([]);

  const dispatch = useDispatch();

  const fetchPostsData = async () => {
    try {
      const data = await getAllBlogPosts();
      dispatch({ type: "FETCH_BLOGPOSTS", payload: data.data.blogPosts });
      setDataList(data.data.blogPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);


  // if(blogPostsList.length > 1) {console.log(blogPostsList[0].text)}

  return (
    <div>
      {dataList.length > 1 &&
        dataList.map( (item,index) => {
          console.log(item);
          return (
            <Card title={item.title} key={index}>
              <Link to={"/posts/" + item._id}>{item.title}</Link>
              {/* <MarkdownArea input={item.text} /> */}
            </Card>
          );
        })}

     
    </div>
  );
};

export default BlogPage;
