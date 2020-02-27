const initialState = JSON.parse(sessionStorage.getItem("userData")) ||
  JSON.parse(localStorage.getItem("userData")) || {
    token: null,
    userId: null,
    tokenExpiration: null,
    isLogin: false
  };

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
      sessionStorage.setItem("userData", JSON.stringify(initialState));
      localStorage.setItem("userData", JSON.stringify(initialState));
      return initialState;
    default:
      return state;
  }
}
export default rootReducer;
