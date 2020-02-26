import React, { useState } from "react";

import {useSelector,useDispatch} from 'react-redux'

import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Icon,message } from "antd";

const { Sider } = Layout;
//SessionStore solves the refresh problem.
function SidersNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("1");


  const isLogin = useSelector(state => state.isLogin)
  const dispatch = useDispatch()

  function hideSider() {
    setCollapsed(!collapsed);
  }

  function handleClick(item) {
    const clickedKey = item.key
    console.log(clickedKey)
    if(clickedKey === "4"){
        
        logout()
        return 
    }
    
    if (clickedKey!== key) {
      setKey(clickedKey);
    } else {
      return;
    }
  }
  function logout(){
    message.info('Log out successfully')
    dispatch({type:"LOGOUT"})
  }
  return (
    <Sider
    theme="light"
      collapsible
      collapsed={collapsed}
      
      trigger={
        !collapsed ? (
          <div onClick={hideSider}>
            <Icon type="caret-left" theme="filled" onClick={hideSider} />
          </div>
        ) : (
          <div onClick={hideSider}>
            <Icon type="caret-right" theme="filled" />
          </div>
        )
      }
    >
      <div className="logo" />
      <Menu  mode="inline" selectedKeys={key} onSelect={(item)=>{handleClick(item)}}>
        <Menu.Item key="1">
          <Link to="/">
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/userCenter">
            <Icon type="user" />
            <span>User Center</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Icon type="form" />
          <span>Blog</span>
        </Menu.Item>
        {
            isLogin &&
            <Menu.Item key="4" >
            <Icon type="form" />
            <span>Log out</span>
          </Menu.Item>
         
        }
      
        
      </Menu>
         
    
    </Sider>
  );
}

export default SidersNav;
