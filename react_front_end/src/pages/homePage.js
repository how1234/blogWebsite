import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostsData, fetchTags } from "../helper/commonMethodsInClient";
import { Card, Row, Select, Spin, Divider } from "antd";
import VistorPostsList from "../components/vistorPostsList";

const HomePage = () => {
  const dataList = useSelector(state => state.blogPosts.dataList);

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    let runAsync = async () => {
      try {
        if (!isCancelled) {
          await fetchTags(dispatch);
          await fetchPostsData(dispatch);
          setLoaded(true);
        }
      } catch (err) {
        if (!isCancelled) {
          throw err;
        }
      }
    };

    runAsync();

    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    <Fragment>
      <div>
        <p>
          The blog{" "}
          <a href="https://github.com/how1234/blog" target="_blank">
            posts
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/how1234/https://github.com/how1234/blogWebsite"
            target="_blank"
          >
            source code
          </a>{" "}
          are also be published to my{" "}
          <a href="https://github.com/how1234/" target="_blank">
            GitHub
          </a>{" "}
          synchronously. This website is still updating features.
        </p>
      </div>
      <Divider></Divider>

      <div>
        {loaded ? (
          dataList && dataList.length === 0 ? (
            <div>no data</div>
          ) : (
            <Fragment>
            <VistorPostsList list={dataList} />
            </Fragment>
         
          )
        ) : (
          <Spin></Spin>
        )}
      </div>
    </Fragment>
  );
};

export default HomePage;
