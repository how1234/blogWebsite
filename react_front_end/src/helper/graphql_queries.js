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
  }
}

export const createBlogPost_requestBody = (title, text) => {
    console.log(title)
    console.log(text)
    return {
      query: `
          mutation {
              createBlogPost(blogPostInput:{title:"${encodeURIComponent(title)}",text:"${encodeURIComponent(text)}"}){
                title
              }
          }
      `
    }
  }


