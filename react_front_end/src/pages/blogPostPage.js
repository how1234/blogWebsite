import React, { useEffect, useState, Fragment } from "react";
import Markdown from 'markdown-to-jsx';
import '../github-markdown.css'
import {
  Spin,
  Divider,
  PageHeader,
  Descriptions,
} from "antd";
import { useHistory, useParams } from "react-router-dom";

import { fetchABlogPostText } from "../helper/commonMethodsInClient";

export const BlogPostPage = () => {
  const history = useHistory();
  const [text, setText] = useState("");
  const [createdDate, setCreateDate] = useState("");
  const [lastModifiedDate, setLastModifiedDate] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const post_id = useParams().id;

  useEffect(() => {
    let isCancelled = false;

    const asynFunc = async () => {
      try {
        if (!isCancelled) {
          const result = await fetchABlogPostText(post_id);

          if (result) {
            setTitle(result.title);
            setText(result.text);

            setLastModifiedDate(
              new Date(Number(result.lastModifiedDate)).toLocaleString()
            );
            setCreateDate(
              new Date(Number(result.createdDate)).toLocaleString()
            );
            setTags(result.tags);
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
        <Fragment>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={title}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Created Time">
                {createdDate}
              </Descriptions.Item>
              <Descriptions.Item label="Last Modified Date">
                {lastModifiedDate}
              </Descriptions.Item>
              <Descriptions.Item label="Tags">
                {tags.join(",")}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <Divider></Divider>
          <div style={{padding:"8px 20px 8px 20px"}}>

            <Markdown className="markdown-body"  children={text}/>
          
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogPostPage;
