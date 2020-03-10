


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



export const getYearAndMouth = (dateString) => {
  let result = new Date (Number(dateString)).toLocaleString()

  if(result.split(",") && result.split(",")[0]){
    result = result.split(",")[0]
  }


  return result
  
}