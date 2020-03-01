import React, { useEffect, useState, Fragment } from "react";
import { useDispatch,useSelector } from "react-redux";

import { getAllBlogPosts } from "../helper/requestMethods";
import MarkdownArea from "../components/markdownArea";

import { Link } from "react-router-dom";

import { Card } from "antd";

const BlogPage = () => {
  const [dataList, setDataList] = useState([]);
  const existedList = useSelector(state => state.blogPosts.dataList)

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
      if(existedList && existedList.length){
        setDataList(existedList)
      }else{
        fetchPostsData();
      }
       
  }, []);

  return (
    <div>
      {dataList.length > 1 &&
        dataList.map((item, index) => {
          
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
