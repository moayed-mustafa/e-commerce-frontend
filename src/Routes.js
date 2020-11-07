

import React, { useState } from 'react'
import UserContext from './userContext'
import Signup from './Signup'
import Login from './Login'
import Homepage from './Homepage'
import Tester from './Tester'
import Navigation from './Navigation'



 import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'


export default function Routes() {

    const ACTIVE_USER = JSON.parse(localStorage.getItem("user"))

        const [current_user, set_current_user] = useState(ACTIVE_USER)


    function checkUser(user) {
        if (!user._token) {
            localStorage.removeItem("user");

        }else {
                localStorage.setItem("user",JSON.stringify(user))
        }
        set_current_user(user)

    }




    return (

        <Router>
                <UserContext.Provider value={{current_user, set_current_user:checkUser}}>
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
            </UserContext.Provider>
                </Router>
    )


}