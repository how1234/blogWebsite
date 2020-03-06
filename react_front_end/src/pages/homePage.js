import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostsData, fetchTags } from "../helper/commonMethodsInClient";
import { Card, Row, Select,Spin,Divider  } from "antd";
import VistorPostsList from "../components/vistorPostsList";

const HomePage = () => {
  const tagsList = useSelector(state => state.tags.tagsList);
  const dataList = useSelector(state => state.blogPosts.dataList);
  const [selectedKey, setSelectedKey] = useState("All");
  const [filteredList, setFilteredList] = useState([]);

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

  const filterList = () => {
    if (selectedKey !== "All") {
      setFilteredList(
        dataList.filter(element => {
          return element.tags.indexOf(selectedKey) > -1;
        })
      );
    }
  };
  return (
    <Fragment>

      <div> 
        <p>The blog <a href="https://github.com/how1234/blog" target="_blank">posts</a> and <a href="https://github.com/how1234/https://github.com/how1234/blogWebsite" target="_blank">source code</a> are also be published to my <a href="https://github.com/how1234/" target="_blank">GitHub</a> synchronously. 
          This website is still updating features.
        </p>
      </div>
      <Divider></Divider>
     
      {/* <Row type="flex" justify="center">
        {loaded && tagsList && tagsList.length > 0 ? (
          <Select
            style={{ width: "50%" }}
            placeholder="Choose Tags"
            onSelect={value => {
              setSelectedKey(value);
              filterList();
            }}
          >
            <Select.Option value="All" key="All">
              All
            </Select.Option>
            {tagsList.map(item => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Spin> Loading</Spin>
        )}
      </Row> */}

      <div>
        {loaded && (!dataList || dataList.length < 1) ? (
          <div> No data </div>
        ) :  (
          <VistorPostsList list={dataList} />
        ) }
      </div>
    </Fragment>
  );
};

export default HomePage;
