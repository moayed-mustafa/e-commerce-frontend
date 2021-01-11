


import React, {useContext}  from 'react'
import { Route, Redirect } from 'react-router-dom'
import userContext from './userContext'


export default function PrivateRoute(props){

    const ACTIVE_USER = useContext(userContext)
    const { current_user } = ACTIVE_USER
    return (
        <Route  exact to={props.path}>
            {
                current_user ?  props.children : <Redirect to="/login" />
            }

        </Route>
    )


}