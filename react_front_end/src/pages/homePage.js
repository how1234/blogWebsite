import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsData, fetchTags } from "../helper/CommonMethodsInClient";

function HomePage() {
const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    let runAsync = async () => {
      try {
        if (!isCancelled) {
          await fetchTags(dispatch);
          await fetchPostsData(dispatch);
        }
      } catch (err) {
        if (!isCancelled) {
          throw err;
        }
      }
    };
    runAsync();

    return () => {
      isCancelled = true;
    };
  });

  return <div>Home Page</div>;
}

export default HomePage;
