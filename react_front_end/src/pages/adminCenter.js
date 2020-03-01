import React, { useState } from "react";
import { Row, Col, Modal, Button } from "antd";
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
 
          
      
    </div>
  );
}

export default AdminCenter;
