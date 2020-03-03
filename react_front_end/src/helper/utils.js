export const deepClone = (obj) => {  
    if (typeof obj !== 'object') return
    let newObj = obj instanceof Array ? [] : {}  
    for (let key in obj) {    
       if (typeof obj[key] === 'object') {      
         newObj[key] = deepClone(obj[key])    
       } else {      
          newObj[key] = obj[key]    
       }  
     }
     return newObj
}
