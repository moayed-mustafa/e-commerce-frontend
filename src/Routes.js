

import React from 'react'
import Signup from './Signup'
import Login from './Login'
import Homepage from './Homepage'
 import {Switch, Route} from 'react-router-dom'


export default function Routes() {
    return (

        <div>
            <Switch>
                {/* My home page should be the products page */}
                <Route exact path="/">
                    <Homepage/>
                </Route>
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