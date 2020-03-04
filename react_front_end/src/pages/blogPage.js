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
const tagsList = useSelector(state => state.tags.tagsList);
  const dataList = useSelector(state => state.blogPosts.dataList);
  const [selectedKey, setSelectedKey] = useState("All");
  const [filteredList, setFilteredList] = useState([]);
    
  const [loaded,setLoaded] = useState(false) 
 
  const fileNotBeRead = Boolean(!tagsList||!tagsList.length ===0 || !dataList || dataList.length ===0)

  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    let runAsync = async () => {
      try {
        if (fileNotBeRead && !isCancelled) {
          await fetchTags(dispatch);
          await fetchPostsData(dispatch);
          setLoaded(true)
        }else{
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
        setFilteredList(
            dataList.filter(element => {
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
