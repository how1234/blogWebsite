import React, { useEffect, useState, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { Spin, Layout } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { fetchABlogPostText } from "../helper/CommonMethodsInClient";

export const BlogPostPage = () => {
  const history = useHistory();
  const [postText, setPostText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const post_id = useParams().id;

  useEffect(() => {
    let isCancelled = false;

    const asynFunc = async () => {
      try {
        if (!isCancelled) {
          const result = await fetchABlogPostText(post_id);

          if (result) {
            setPostText(result.text);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          throw err;
        }
      }
    };
    asynFunc();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Fragment>
      {loaded ? (
        <Spin style={{ display: "block", margin: "auto" }} />
      ) : (
        <ReactMarkdown source={postText} />
      )}
    </Fragment>
  );
};

export default BlogPostPage;
