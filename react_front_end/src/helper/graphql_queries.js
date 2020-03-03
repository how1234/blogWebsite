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

export const getBlogPost_requestBody = id => {
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

export const removeBlogPost_requestBody = id => {
  return {
    query: `
         query{
            removeBlogPost(_id:"${id}")
          }
         `
  };
};

export const getAllTags_requestBody = () => {
  return {
    query: `
           query{
              getAllTags{
                  name
              }
            }
           `
  };
};

export const createNewTag_requestBody = name => {
  return {
    query: `
           mutation{
            createTag(name:"${name}"){
                name
              }
            }
           `
  };
};
