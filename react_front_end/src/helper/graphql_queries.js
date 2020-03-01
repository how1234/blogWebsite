export const login_requestBody = (email, password) => {
  return {
    query: `
        query{
            login(email:"${email}",password:"${password}"){
                userId,
                token,
                tokenExpiration
            }
        }
    `
  };
};

export const createBlogPost_requestBody = (title, text) => {
  return {
    query: `
          mutation {
              createBlogPost(blogPostInput:{title:"${encodeURIComponent(
                title
              )}",text:"${encodeURIComponent(text)}"}){
                title
              }
          }
      `
  };
};

export const getAllBlogPosts_requestBody = () => {
  return {
    query: `
          query {
            blogPosts{
                _id
                title
              }
          }
      `
  };
};


export const getBlogPost_requestBody = (id) => {
    return {
      query: `
            query {
              getBlogPost(_id:"${id}"){
                  title
                  text
                }
            }
        `
    };
  };
  