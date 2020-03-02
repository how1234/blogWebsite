import React, { useState } from "react";
import { Row, Col, Modal, Button } from "antd";
import {Link} from 'react-router-dom'
import UploadButton from "../components/uploadButton";
import AdminPostsList from "../components/adminPostsList";

function AdminCenter() {
  

  return (
    <div>

      <Row type="flex" justify="center">
        <AdminPostsList/>
      </Row>

      <Row type="flex" justify="space-around" >
        <UploadButton/>
      </Row>
 
      <Row type="flex" justify="center" >
        <Link to="/adminCenter/editPosts/new"><Button type="primary">Create a New Blog Post</Button> </Link>
      </Row>
          
      
    </div>
  );
}

export default AdminCenter;
