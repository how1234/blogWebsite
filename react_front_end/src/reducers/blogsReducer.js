

const blogPosts = (state={dataList:[]},action) => {

    switch(action.type){
        case "FETCH_POSTS":
            
            return state
    
        default:
            return state;
    }
}

export default blogPosts