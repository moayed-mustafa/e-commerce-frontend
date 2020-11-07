

import React, { useState, useEffect } from 'react'
import UserContext from './userContext'
import Signup from './Signup'
import Login from './Login'
import Homepage from './Homepage'
import Tester from './Tester'
import Navigation from './Navigation'



 import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'


export default function Routes() {

    const ACTIVE_USER = JSON.parse(localStorage.getItem("user"))

    console.log(ACTIVE_USER)
        const [current_user] = useState(ACTIVE_USER)
    console.log(current_user)




    return (

            <UserContext.Provider value={current_user}>
                <Router>
                    <Navigation />
                    <Switch>

                        <Route exact path="/">
                            <Homepage/>
                        </Route>
                        <Route exact path="/signup">
                            <Signup/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/tester">
                            <Tester/>
                        </Route>
                    </Switch>
                </Router>
            </UserContext.Provider>
    )


}