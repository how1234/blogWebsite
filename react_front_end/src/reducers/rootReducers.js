const initialState = {
    token:null,
    userId:null,
    tokenExpiration:null,
    isLogin:false
}

function rootReducer(state,action){
    switch(action.type){
        case "LOGIN":
            let loginState = {isLogin:true,
                userId:action.payload.userId,
            token:action.payload.token,
        tokenExpiration:action.payload.tokenExpiration}

            sessionStorage.setItem("userData", JSON.stringify(loginState))
            return loginState
        
       
        case "LOGOUT":
            sessionStorage.setItem("userData", JSON.stringify(initialState))
            return initialState
        case "INITIAL":
            state = JSON.parse(sessionStorage.getItem("userData")) || initialState
            return state
        default:

            return state
    }
}
export default rootReducer