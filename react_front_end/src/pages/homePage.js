import React from 'react'
import {useSelector,useDispatch} from 'react-redux' 

function HomePage() {
  
    const state = useSelector(state=> state)
    const dispatch = useDispatch() 
    return (
        <div>
            Home Page
        </div>
    )
}

export default HomePage
