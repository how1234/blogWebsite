import React, { useState } from "react";
import { Row, Col, Modal, Button } from "antd";
import UploadButton from "../components/uploadButton";

function UserCenter() {
  

  return (
    <div>
      <Row type="flex" justify="center">
        <Col span={12}>
          <UploadButton></UploadButton>
        </Col>
       
      </Row>
    </div>
  );
}

export default UserCenter;
