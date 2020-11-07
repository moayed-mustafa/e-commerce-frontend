

import React, { useContext } from 'react'
import userContext from './userContext'



export default function Tester() {

    const currentUser = useContext(userContext)
    console.log(currentUser)

    return (

        <div>
            {currentUser? <h1>You are logged in</h1>:<h1>You are not logged in</h1> }

    </div>

    )
}