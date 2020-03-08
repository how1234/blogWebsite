import React, { Fragment } from "react";

import { List,Col } from "antd";
import { Link } from "react-router-dom";
import {getYearAndMouth} from '../helper/utils'
const VistorPostsList = props => {
  const list = props.list;
  return (
    <Fragment>

   {list && list.length >= 0? <div style={{margin:"auto",width:"70%"}}>
      <Col type="flex" justify="center" >
        {list && list.length >= 1 &&
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        style={{margin:"auto"}}
        dataSource={list}
        renderItem={item => (
          <List.Item
          >
            <List.Item.Meta
              title={<Link to={"/posts/" + item._id} style={{fontSize:"2em"}}>{item.title}</Link>}
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
    </div>:<div>No data</div>}
 
    

    </Fragment>
  );
};
export default VistorPostsList;
