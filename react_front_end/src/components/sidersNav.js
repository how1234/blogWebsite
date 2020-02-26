import React, { useState } from "react";

import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;
//SessionStore solve the refresh problem.
function SidersNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("1");

  function hideSider() {
    setCollapsed(!collapsed);
  }

  function changeSelectedKey(item) {
  
    if (item.key !== key) {
      setKey(item.key);
    } else {
      return;
    }
  }
  return (
    <Sider
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
      <Menu theme="dark" mode="inline" selectedKeys={key} onSelect={(item,key)=>{changeSelectedKey(item)}}>
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
      </Menu>
    </Sider>
  );
}

export default SidersNav;
