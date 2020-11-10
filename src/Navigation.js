
import React, {useState, useContext} from 'react'
import './Navigation.css'
import { Button, Badge } from 'reactstrap'
import { NavLink, useHistory} from 'react-router-dom'
import userContext from './userContext'
import {useSelector} from 'react-redux'



export default function Navigation() {

    let [categoriesOpen, setCategoriesOpen] = useState(false)
    let [shevronOpen, setShevronOpen] = useState(false)
    const ACTIVE_USER = useContext(userContext)
    const { current_user, set_current_user } = ACTIVE_USER

    const history = useHistory()
    const cart = useSelector(st => st.cart)

    //  change the current_user state and close the drop down menu
    function logout() {
        set_current_user()
        setShevronOpen(false)
    }

    function clickHandler(e) {
        const url = `/products/${e.target.id}`
        history.push(url)
        setCategoriesOpen(!categoriesOpen)

    }

    function LoggedInViewNav() {

        return (
        <ul className="main-nav">
                <li className="nav-item nav-brand m-1">
                <NavLink to="/">
                        <Button className ="btn-brand" >Shopper</Button>
                    </NavLink>

                </li>
                <span className="li-span">
                <li className="nav-item m-1">
                    <Button className="li-btn"
                        onClick={()=> setCategoriesOpen(!categoriesOpen)}>Categories</Button>

                        {categoriesOpen ?
                            <ul className="drop-down">
                                <li className="nav-item nav-drop-down" id="men-clothing" onClick={clickHandler}>Men Clothing</li>
                                <li className="nav-item nav-drop-down" id="women-clothing" onClick={clickHandler}>Women cClothing</li>
                                <li className="nav-item nav-drop-down" id="jewelery" onClick={clickHandler}>Jewelery</li>
                                <li className="nav-item nav-drop-down" id="electronics" onClick={clickHandler}>Electronics</li>
                            </ul>
                            : null}
                    </li>

                    <li className="nav-item m-1">
                        <Button className="li-btn"
                            onClick={() => setShevronOpen(!shevronOpen)}>
                            <i className="fas fa-chevron-down"></i>
                        </Button>

                        {shevronOpen ?
                            <ul className="drop-down">
                                    <li className="nav-item nav-drop-down">orders</li>

                                    <li className="nav-item nav-drop-down">
                                        <i className="fas fa-cog"></i>
                                    </li>
                                    <li className="nav-item nav-drop-down" onClick={logout}>
                                        <i className="fas fa-sign-out-alt"></i>
                                    </li>
                            </ul>
                            : null}
                </li>
                    <li className="nav-item m-1">
                        <Button className="li-btn" onClick={()=> history.push("/cart")}>
                            <i className="fas fa-shopping-cart">
                                <Badge className="badge" style={{ marginLeft: 5, padding:5 }} >{cart.length}</Badge>
                            </i>
                        </Button>
                    </li>
                </span>
            </ul>
            )

    }



    function LoggedOutViewNav() {
        return (
            <ul className="main-nav">
                <li className="nav-item nav-brand m-1">
                    <NavLink to="/">
                        <Button className ="btn-brand" >Shopper</Button>

                    </NavLink>
                </li>
                <span className="li-span">
                    <li className="nav-item m-1">
                        <NavLink to="/login">
                            <Button className="li-btn">Login</Button>
                        </NavLink>
                    </li>
                    <li className="nav-item m-1">
                        <NavLink to="/signup">
                            <Button  className="li-btn">Signup</Button>
                        </NavLink>
                    </li>
                </span>
            </ul>

        );

    }
    return (
        <div >
            {current_user ? LoggedInViewNav() : LoggedOutViewNav()}
        </div>
    )
}