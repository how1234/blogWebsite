import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBlogPosts } from "../helper/requestMethodsToServer";
import MarkdownArea from "../components/markdownArea";

import { Link } from "react-router-dom";
import {fetchPostsData} from '../helper/CommonMethodsInClient'
import { Card, Row,Select } from "antd";

const BlogPage = () => {
  const dataList = useSelector(state => state.blogPosts.dataList);

  const dispatch = useDispatch();



  useEffect( () => {


    let isCancelled = false;
    let runAsync = async()=>{
      try{
        if(!isCancelled){
            fetchPostsData(dispatch);
        }
      }catch(err){
        if(!isCancelled){
          throw err
        }
  }
    }
    
    runAsync()
   
    
    return ()=>{
        runAsync = null
      isCancelled = true
    }
   
  }, []);

  return (
    <div>
      {!(dataList && dataList.length > 0) ? (
        <div> No data </div>
      ) : (
      

   

     
        dataList.map((item, index) => {
          return (
            <Row type="flex" justify="center" key={index}>
              <Card title={item.title} style={{ width: "50%" }}>
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
