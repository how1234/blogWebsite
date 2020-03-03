import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchPostsData, fetchTags } from "../helper/CommonMethodsInClient";
import { Card, Row, Select } from "antd";
import { deepClone } from "../helper/utils";

const DisplayList = (props) => {
   
return (
    <div>
        {props.list.map((item, index) => (
        <Row type="flex" justify="center" key={index}>
            <Card title={item.title} style={{ width: "50%" }}>
            <Link to={"/posts/" + item._id}>{item.title}</Link>
            </Card>
        </Row>
        )
        )
        }
    
    </div>
  
    
    
)   
};

const BlogPage = () => {
  const dataList = useSelector(state => state.blogPosts.dataList);
  const [selectedKey, setSelectedKey] = useState("All");
  const [filteredList, setFilteredList] = useState([]);
    
  const [loaded,setLoaded] = useState(false) 
  const tagsList = useSelector(state => state.tags.tagsList);

  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    let runAsync = async () => {
      try {
        if (!isCancelled) {
          await fetchTags(dispatch);
          await fetchPostsData(dispatch);
          setLoaded(true)
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

    if(selectedKey !== "All"){
        const fullDataList = deepClone(dataList);
        setFilteredList(
          fullDataList.filter(element => {
            return element.tags.indexOf(selectedKey) > -1;
          })
        );
    }
   
  
  };
  return (
    <Fragment>
      <Row type="flex" justify="center">
        
        {loaded && tagsList && tagsList.length > 0 ? (
            
          <Select
            style={{ width: "50%" }}
            placeholder="Choose Tags"
            defaultActiveFirstOption
            onSelect={value => {
                setSelectedKey(value)
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
          <div> Loading</div>
        )}
      </Row>

      <div>
        { loaded && dataList && dataList.length < 0 ? (
          <div> No data </div>
        ) : selectedKey === "All" && loaded ? (
            
          <DisplayList list={dataList} />
        ) : (
          <DisplayList list={filteredList} />
        )}
        
      </div>
    </Fragment>
  );
};

export default BlogPage;
