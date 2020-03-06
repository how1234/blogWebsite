

const blogPosts = (state={},action) => {

    switch(action.type){
        case "RELOAD_BLOGPOSTS":
            state = {...state,dataList:action.payload}
            console.log(state)
            return state
        default:
            return state;
    }
}

export default blogPosts