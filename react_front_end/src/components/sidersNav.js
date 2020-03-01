import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Icon, message } from "antd";

const { Sider } = Layout;
function SidersNav() {
  const selectedKey = useSelector(state => 
    {return state.pageData.selectedKey});

  const collapsed = useSelector(state => state.pageData.collapsed);


  const isLogin = useSelector(state => state.auth.isLogin);

  const dispatch = useDispatch();

  function hideSider() {
    dispatch({
      type: "UPDATE_PAGE_DATA",
      payload: { selectedKey: selectedKey, collapsed: !collapsed }
    });
  }

  function handleClick(item) {
    const clickedKey = item.key;
    if (clickedKey === "4") {
      logout();
      dispatch({
        type: "UPDATE_PAGE_DATA",
        payload: { selectedKey: "1", collapsed: collapsed }
      });;
      return;
    }

    if (clickedKey !== selectedKey) {
        dispatch({
            type: "UPDATE_PAGE_DATA",
            payload: { selectedKey: clickedKey, collapsed: collapsed }
          });;
    } else {
      return;
    }
  }
  function logout() {
    message.info("Log out successfully");
    dispatch({ type: "LOGOUT" });
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
      <Menu
        mode="inline"
        selectedKeys={selectedKey}
        onSelect={item => {
          handleClick(item);
        }}
      >
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
          <Link to="/blog">
            <Icon type="form" />
            <span>Blog</span>
          </Link>
        </Menu.Item>
        {isLogin && (
          <Menu.Item key="4">
            <Icon type="form" />
            <span>Log out</span>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
}

export default SidersNav;
