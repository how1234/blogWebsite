import React, { Fragment } from "react";

import { Row, Card, List, Skeleton, Button,Col } from "antd";
import { Link } from "react-router-dom";
import {getYearAndMouth} from '../helper/utils'
const VistorPostsList = props => {
  const list = props.list;
  return (
    <div style={{margin:"auto",width:"70%"}}>
      <Col type="flex" justify="center" >
        {list && list.length > 1 &&
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        style={{margin:"auto"}}
        dataSource={list}
        renderItem={item => (
          <List.Item
          >
            <List.Item.Meta
              title={<Link to={"/posts/" + item._id}>{item.title}</Link>}
              description={<div>
                <p>Tags:{item.tags.join(',')}</p> 
                <p>Time: {getYearAndMouth(item.lastModifiedDate)}</p></div>
            }
            />

            
          </List.Item>
        )}
      />
        }
      </Col>
    </div>
  );
};
export default VistorPostsList;
