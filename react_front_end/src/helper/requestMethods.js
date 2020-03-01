import {
  createBlogPost_requestBody,
  getAllBlogPosts_requestBody,
  getBlogPost_requestBody
} from "./graphql_queries";

export const uploadSingleBlogPost = async (blogPost, userData) => {
  fetch("http://localhost:8000/graphql", {
    method: "POST",
    body: JSON.stringify(
      createBlogPost_requestBody(blogPost.title, blogPost.fileTextData)
    ),
    headers: {
      "Content-Type": "application/json",
      Authorization: userData.token,
      userId: userData.userId
    }
  })
    .then(resolve => resolve)
    .catch(err => {
      throw err;
    });
};

export const getAllBlogPosts = async () => {
  return await fetch("http://localhost:8000/graphql", {
    method: "POST",
    body: JSON.stringify(getAllBlogPosts_requestBody()),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      return resData;
    })
    .catch(err => {
      throw err;
    });
};

export const getOneBlogPost = async id => {
  return await fetch("http://localhost:8000/graphql", {
    method: "POST",
    body: JSON.stringify(getBlogPost_requestBody(id)),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      
      return res.json();
    })
    .then(resData => {
      return resData.data.getBlogPost;
    })
    .catch(err => {
      return err
    });
};
