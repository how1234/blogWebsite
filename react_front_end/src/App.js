import React from "react";

import "./App.css";
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";


import {useSelector} from 'react-redux' 




import SideNavs from "./components/sidersNav";
import HomePage from "./pages/homePage";
import UserCenter from './pages/userCenter'
import LoginPage from "./pages/loginPage";
import BlogPage from "./pages/blogPage";
import BlogPostPage from "./pages/blogPostPage";
import errorPage from "./pages/errorPage";


const {Content} = Layout;

function App() {

  const isLogin = useSelector((state) => state.auth.isLogin)

  console.log(isLogin)
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavs />
        <Layout>
          <Content
            style={{
              margin: "8px 8px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <Switch>
              <Route path="/" exact component={HomePage} />
              {isLogin ? <Redirect from='/login' to="/adminCenter" /> : <Redirect from='/adminCenter' to="/login"/>}
              <Route path="/adminCenter" component={UserCenter} />
              <Route path="/login" component={LoginPage}/>
              <Route path="/blog" component={BlogPage} />
              <Route path="/posts/:id" component={BlogPostPage} />
              <Route path="/404" component={errorPage} />
              <Redirect from="*" to='404'/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;