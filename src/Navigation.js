
import React, {useState, useContext} from 'react'
import './Navigation.css'
import { Button, Badge, Tooltip } from 'reactstrap'
import { NavLink, useHistory} from 'react-router-dom'
import userContext from './userContext'
import {useSelector} from 'react-redux'



export default function Navigation() {

    let [categoriesOpen, setCategoriesOpen] = useState(false)
    let [chevron, setChevronOpen] = useState(false)
    const ACTIVE_USER = useContext(userContext)
    const { current_user, set_current_user } = ACTIVE_USER
    //  update user tooltip
    const [cogOpen, setCogOpen] = useState(false);
    const toggleCog = () => setCogOpen(!cogOpen);

    // wishlist tooltip
    const [starOpen, setStarOpen] = useState(false);
    const toggleStar = () => setStarOpen(!starOpen);

    // wishlist tooltip
    const [logoutOpen, setlogoutOpen] = useState(false);
    const togglelogOut = () => setlogoutOpen(!logoutOpen);





    const history = useHistory()
    const cart = useSelector(st => st.cart)
    const wishlist = useSelector(st => st.wishlist)

    //  change the current_user state and close the drop down menu
    function logout() {
        set_current_user()
        setChevronOpen(false)
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
                <li className="nav-item m-1 category">
                    <Button className="li-btn"
                        onClick={()=> setCategoriesOpen(!categoriesOpen)}>Categories</Button>

                        {categoriesOpen ?
                            <ul className="drop-down">

                                <li className="nav-item nav-drop-down " id="men-clothing"
                                    onClick={clickHandler}>Men Clothing
                                    </li>

                                    <li className="nav-item nav-drop-down"
                                        id="women-clothing" onClick={clickHandler}>Women Clothing
                                    </li>

                                <li className="nav-item nav-drop-down" id="jewelery" onClick={clickHandler}>Jewelery</li>
                                <li className="nav-item nav-drop-down" id="electronics" onClick={clickHandler}>Electronics</li>
                            </ul>
                            : null}
                    </li>

                    <li className="nav-item m-1">
                        <Button className="li-btn"
                            onClick={() => setChevronOpen(!chevron)}>
                            <i className="fas fa-chevron-down"></i>
                        </Button>

                        {chevron ?
                            <ul className="drop-down">
                                <li style={{ display: "inline" }} className="nav-item nav-drop-down" onClick={() => {
                                    history.push('/orders')
                                    setChevronOpen(!chevron)
                                }}>
                                orders
                                    </li>

                                <li className="nav-item nav-drop-down" id="cog" onClick={() => {

                                    setChevronOpen(false)
                                    history.push('/update-user')
                                }}>
                                    <i className="fas fa-cog" >  </i>
                                    <Tooltip placement="top" isOpen={cogOpen} autohide={false}
                                    target="cog" toggle={toggleCog}>Update User</Tooltip>
                                </li>
                                <li className="nav-item nav-drop-down" id="star" onClick={() =>
                                    {setChevronOpen(false)
                                    history.push("/wishlist")}

                                }>
                                    <i className="fas fa-star">
                                       <Badge className="badge" style={{ marginLeft: 5, padding:5 }} >{wishlist.length}</Badge>
                                    </i>
                                    <Tooltip placement="top" isOpen={starOpen} autohide={false}
                                    target="star" toggle={toggleStar}>Wishlist</Tooltip>
                                </li>
                                <li className="nav-item nav-drop-down" id="logout" onClick={logout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <Tooltip placement="top" isOpen={logoutOpen} autohide={false}
                                    target="logout" toggle={togglelogOut}>Logout</Tooltip>
                                    </li>

                            </ul>
                            : null}
                </li>
                    <li className="nav-item m-1">
                        <Button className="li-btn" onClick={() =>
                            history.push("/cart",

                            )}>
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