const blankObject = {
    token: null,
    userId: null,
    tokenExpiration: null,
    isLogin: false
  };


const initialState = JSON.parse(localStorage.getItem("userData")) ||
  JSON.parse(sessionStorage.getItem("userData")) || blankObject


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      let loginState = {
        isLogin: true,
        userId: action.payload.userId,
        token: action.payload.token,
        tokenExpiration: action.payload.tokenExpiration
      };

      if (action.payload.checked) {
        localStorage.setItem("userData", JSON.stringify(loginState));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(loginState));
      }

      console.log(loginState);
      return loginState;
    case "LOGOUT":
      sessionStorage.setItem("userData", JSON.stringify({blankObject}));
      localStorage.setItem("userData", JSON.stringify(blankObject));
      return blankObject;
    default:
      return initialState ;
  }
}
export default rootReducer;
