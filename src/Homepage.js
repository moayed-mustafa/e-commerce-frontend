

import React, {useContext} from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import userContext from './userContext'
import Products from './ProductsList'
import { v4 as uuid } from 'uuid';




export default function Homepage() {

    const ACTIVE_USER = useContext(userContext)
    const {current_user} = ACTIVE_USER

    return (
        !current_user?
        <div className="container" key={uuid()}>
            <Jumbotron className="jumbo" >
                <h1 className="display-3">Welcome to Shopper</h1>
                <p className="lead">
                    On this website, you can buy all kinds of stuff, from nice clothes and accessories to electronics and gadgets!
                    </p>
                <hr className="my-2" />
                <span className="jumbo-span" key={uuid()}>
                    <p>Signup for an account if you are new here</p>
                    <Link to="/signup">
                        <Button className="li-btn" color="primary">Signup</Button>
                    </Link>
                </span>
                <span className="jumbo-span" key={uuid()}>
                    <p>Or login to continue shopping</p>
                    <Link to="/login">
                        <Button className="li-btn" color="primary">Login</Button>
                    </Link>
                </span>

            </Jumbotron>

        </div>
            :
            <Products/>

    )

}