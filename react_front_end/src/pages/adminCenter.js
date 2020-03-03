import React, { useState } from "react";
import { Row, Col, Modal, Button } from "antd";
import {Link} from 'react-router-dom'
import UploadWidgits from "../components/uploadWidgits";
import AdminPostsList from "../components/adminPostsList";

function AdminCenter() {
  

  return (
    <div>

      <Row type="flex" justify="center">
        <AdminPostsList/>
      </Row>

        <UploadWidgits/>
   
 
      {/* <Row type="flex" justify="center" >
        <Link to="/adminCenter/editPosts/new"><Button type="primary">Create a New Blog Post</Button> </Link>
      </Row>
           */}
      
    </div>
  );
}

export default AdminCenter;
