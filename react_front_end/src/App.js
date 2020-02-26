import React, { useState } from "react";

import "./App.css";
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";


import {useSelector,useDispatch} from 'react-redux' 

import SideNavs from "./components/sidersNav";
import HomePage from "./pages/homePage";
import UserCenter from './pages/userCenter'
import LoginPage from "./pages/loginPage";

const { Header, Content } = Layout;

function App() {
  const isLogin = useSelector( (state) => state.isLogin)
  const disPatch  = useDispatch()
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavs />
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <Switch>
              <Route path="/" exact component={HomePage} />
              {!isLogin && <Redirect from='/UserCenter' to="/login" />}
              <Route path="/UserCenter" exact component={UserCenter} />
              <Route path="/login" component={LoginPage}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
