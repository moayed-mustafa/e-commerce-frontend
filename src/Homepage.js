

import React, {useContext} from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import userContext from './userContext'



export default function Homepage() {

    const ACTIVE_USER = useContext(userContext)
    console.log(ACTIVE_USER)
    const {current_user} = ACTIVE_USER

    return (
        !current_user?
        <div className="container">
            <Jumbotron className="jumbo" >
                <h1 className="display-3">Welcome to Shopper</h1>
                <p className="lead">
                    On this website, you can buy all kinds of stuff, from nice clothes and accessories to electronics and gadgets!
                    </p>
                <hr className="my-2" />
                <span className="jumbo-span">
                    <p>Signup for an account if you are new here</p>
                    <Link to="/signup">
                        <Button className="li-btn" color="primary">Signup</Button>
                    </Link>
                </span>
                <span className="jumbo-span">
                    <p>Or login to continue shopping</p>
                    <Link to="/login">
                        <Button className="li-btn" color="primary">Login</Button>
                    </Link>
                </span>

            </Jumbotron>

        </div>
            :
            // instead of this, I'll need to have my products show up here when a use is signed in
            <Link to="/tester">
                <Button>teseter</Button>
            </Link>

    )

}