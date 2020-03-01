






const initialObj = {selectedKey:"1",
    collapsed:true}

const storedData = JSON.parse(sessionStorage.getItem('pageData'))

console.log(storedData["selectedKey"])
let initialState = storedData["selectedKey"]? storedData: initialObj


//Session Storage only works with String
const pageData = (state=initialState,action) =>{
    switch(action.type){
        case "UPDATE_PAGE_DATA":
            state = action.payload
            sessionStorage.setItem('pageData',JSON.stringify(state))
            
            return state
        default:
            return state
    }
}

export default pageData