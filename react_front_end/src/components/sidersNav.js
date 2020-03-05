import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Icon, message } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  SmileOutlined,
  MailOutlined
} from "@ant-design/icons";

const { Sider } = Layout;
function SidersNav() {
  const history = useHistory();
  const selectedKey = useSelector(state => state.pageData.selectedKey);

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
    if (clickedKey === "3") {
      logout();
      dispatch({
        type: "UPDATE_PAGE_DATA",
        payload: { selectedKey: "1", collapsed: collapsed }
      });
      history.push("/");
      return;
    }

    if (clickedKey !== selectedKey) {
      dispatch({
        type: "UPDATE_PAGE_DATA",
        payload: { selectedKey: clickedKey, collapsed: collapsed }
      });
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
          <Link to="/adminCenter">
            <Icon type="user" />
            <span>My Center</span>
          </Link>
        </Menu.Item>

        {isLogin ? (
          <Menu.Item key="3">
            <Icon type="form" />
            <span>Log out</span>
          </Menu.Item>
        ) : (
          <Menu.SubMenu
            key="4"
            title={
              <span>
                <SmileOutlined />
                <span>About me</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <a href="https://github.com/how1234/blogWebsite" target="_blank">
                <GithubOutlined />
                GitHub
              </a>
            </Menu.Item>

            <Menu.Item key="6">
              <a
                href="https://www.linkedin.com/in/weiying-zhong-a36170143/"
                target="_blank"
              >
                <LinkedinOutlined />
                Linkedin
              </a>
            </Menu.Item>

            <Menu.Item key="7">
              <a href="mailto:williamzhong6@gmail.com" target="_blank">
                <MailOutlined />
                Email
              </a>
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </Sider>
  );
}

export default SidersNav;
