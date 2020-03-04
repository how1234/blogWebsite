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

export const createBlogPost_requestBody = (title, text,selectedTags) => {
  return {
    query: `
          mutation {
              createBlogPost(blogPostInput:{title:"${encodeURIComponent(
                title
              )}",text:"${encodeURIComponent(text)}",tags:${JSON.stringify(selectedTags)}}){
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
                tags
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
                  createdDate
                  lastModifiedDate
                  tags
                }
            }
        `
  };
};
export const updateBlogPost_requestBody = (id,title,text,selectedTags) => {
    
    return {
        query: `
        mutation{
            updateBlogPost(_id:"${id}",title:"${encodeURIComponent(title)}",text:"${encodeURIComponent(text)}",tags:${JSON.stringify(selectedTags)}){
              title,
              tags
            }
          }
        `
    }
}
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

