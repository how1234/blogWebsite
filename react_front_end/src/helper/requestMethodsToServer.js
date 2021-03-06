import {
  login_requestBody,
  auth_requestBody,
  createBlogPost_requestBody,
  getAllBlogPosts_requestBody,
  getBlogPost_requestBody,
  updateBlogPost_requestBody,
  removeBlogPost_requestBody,
  getAllTags_requestBody,
  createNewTag_requestBody
} from "./graphql_queries";

let url;
if(window.location.origin === "http://localhost:3000"){
  url="http://localhost:8080/graphql"
}else{
  url=`/graphql`
}


export const loginAsAdmin = async (email, password,checked) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(login_requestBody(email, password,checked)),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.status.toString()[0] == 5) {
        return new Error("User doesn't existed or password is incorrect");
      } else if (res.status.toString()[0] == 4) {
        return new Error(res.status);
      } else if (res.status !== 200 && res.status !== 201) {
        return new Error("Connection fail");
      }
      return res.json();
    })
    .then(resData => {
      return resData;
    })
    .catch(err => {
      throw err
    });
};

export const authToServer = async (userData) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(auth_requestBody()),
    headers: {
      "Content-Type": "application/json",
      Authorization: userData.token,
      userId: userData.userId
    }
  })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      return resData;
    })
    .catch(err => {
      throw err
    });
};

export const createABlogPost = async (
  blogPost,
  userData,
  selectedTags
) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(
      createBlogPost_requestBody(
        blogPost.title,
        blogPost.fileTextData,
        selectedTags
      )
    ),
    headers: {
      "Content-Type": "application/json",
      Authorization: userData.token,
      userId: userData.userId
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

export const getAllBlogPosts = async () => {
  return await fetch(url, {
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

export const getABlogPost = async id => {
  return await fetch(url, {
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
      throw err;
    });
};


export const updateABlogPost = async ( {id,title,text}, userData,selectedTags) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(updateBlogPost_requestBody(id,title,text,selectedTags)),
    headers: {
      "Content-Type": "application/json",
      Authorization: userData.token,
      userId: userData.userId,
      
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

export const removeABlogPost = async (id, userData) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(removeBlogPost_requestBody(id)),
    headers: {
      "Content-Type": "application/json",
      Authorization: userData.token,
      userId: userData.userId
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

export const getAllTags = async () => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(getAllTags_requestBody()),
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

export const createNewTag = async (name, userData) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(createNewTag_requestBody(name)),
    headers: {
      "Content-Type": "application/json",
      Authorization: userData.token,
      userId: userData.userId
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
