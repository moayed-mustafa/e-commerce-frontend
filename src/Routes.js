

import React, { useState } from 'react'
import UserContext from './userContext'
import Signup from './Signup'
import Login from './Login'
import UpdateUser from './UserUpdate'
import Homepage from './Homepage'
import Navigation from './Navigation'
import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'
import Category from './Category.js'
import Cart from './Cart.js'
import Wishlist from './Wishlist.js'
import Orders from './Orders.js'



 import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'


export default function Routes() {

    const ACTIVE_USER = JSON.parse(localStorage.getItem("user"))
    const [current_user, set_current_user] = useState(ACTIVE_USER)

    function checkUser(user) {
        if (!user || !user._token) {
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
                        <RestrictedRoute exact path="/signup">
                            <Signup/>
                    </RestrictedRoute>

                    <RestrictedRoute exact path="/login">
                            <Login/>
                    </RestrictedRoute>
                    <PrivateRoute exact path="/update-user">
                            <UpdateUser/>
                    </PrivateRoute>

                    <PrivateRoute path="/cart">
                        <Cart/>
                    </PrivateRoute>

                    <PrivateRoute path="/wishlist">
                        <Wishlist/>
                    </PrivateRoute>
                    <PrivateRoute path="/orders">
                        <Orders/>
                    </PrivateRoute>

                    <PrivateRoute exact path="/products/:category">
                        <Category/>
                    </PrivateRoute>

                    </Switch>
            </UserContext.Provider>
                </Router>
    )


}