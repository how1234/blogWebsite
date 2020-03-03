

const tags = (state={},action) => {

    switch(action.type){
        case "RELOAD_TAGS":
            
            state = {...state,tagsList:action.payload}
            return state
        default:
            return state;
    }
}

export default tags