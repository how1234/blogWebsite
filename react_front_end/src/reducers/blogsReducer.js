

const blogPosts = (state={},action) => {

    switch(action.type){
        case "FETCH_BLOGPOSTS":
            state = {dataList:action.payload}
            return state
    
        default:
            return state;
    }
}

export default blogPosts