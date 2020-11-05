

import React from 'react'
import Signup from './signup'
import Login from './login'
 import {Switch, Route} from 'react-router-dom'


export default function Routes() {
    return (

        <div>
            <Switch>
                <Route exact path="/signup">
                    <Signup/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
            </Switch>
        </div>
    )


}