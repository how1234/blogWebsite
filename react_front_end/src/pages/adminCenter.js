import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import UploadWidgits from "../components/uploadWidgits";
import AdminPostsList from "../components/adminPostsList";
import { authToServer } from "../helper/requestMethodsToServer";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
function AdminCenter() {
  const { userId, token } = useSelector(state => state.auth);
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();
  const auth = async () => {
    try {
      const data = await authToServer({ userId, token });
      if (data.data && !data.data.authAsAdmin) {
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const runAsync = async () => {
      if (!isCancelled) {
        try {
          await auth();
        } catch (err) {
          throw err;
        }
      }
    };
    runAsync();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div>
      {isLogin ? (
        <Fragment>
          {" "}
          <Row type="flex" justify="center">
            <AdminPostsList />
          </Row>
          <UploadWidgits />{" "}
        </Fragment>
      ) : (
        <Redirect from="/adminCenter" to="/login" />
      )}
    </div>
  );
}

export default AdminCenter;
