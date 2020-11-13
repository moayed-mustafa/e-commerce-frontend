
import React, {useState, useContext} from 'react'
import './Navigation.css'
import { Button, Badge} from 'reactstrap'
import { NavLink, useHistory} from 'react-router-dom'
import userContext from './userContext'
import {useSelector, connect, useDispatch} from 'react-redux'



export  function Navigation() {

    let [categoriesOpen, setCategoriesOpen] = useState(false)
    let [chevron, setChevronOpen] = useState(false)
    const ACTIVE_USER = useContext(userContext)
    const { current_user, set_current_user } = ACTIVE_USER


    const history = useHistory()
    const cart = useSelector(st => st.cart)
    const wishlist = useSelector(st => st.wishlist)
    const dispatch = useDispatch()

    //  change the current_user state and close the drop down menu
    function logout() {

        dispatch({ type: "CLEAR_CART" })
        dispatch({ type: "CLEAR_WISHLIST" })
        //  DO THE SAME FOR WISHLIST
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
                <li className="nav-item nav-brand m-1"     >
                <NavLink to="/">
                        <Button className ="btn-brand" >Shopper</Button>
                    </NavLink>

                </li>

                <span className="li-span">
                <li className="nav-item m-1 category"    >
                    <Button className="li-btn"
                        onClick={()=> setCategoriesOpen(!categoriesOpen)}>Categories</Button>

                        {categoriesOpen ?
                            <ul className="drop-down">

                                <li    className="nav-item nav-drop-down " id="men-clothing"
                                    onClick={clickHandler}>Men Clothing
                                    </li>

                                    <li   className="nav-item nav-drop-down"
                                        id="women-clothing" onClick={clickHandler}>Women Clothing
                                    </li>

                                <li  className="nav-item nav-drop-down" id="jewelery" onClick={clickHandler}>Jewelery</li>
                                <li  className="nav-item nav-drop-down" id="electronics" onClick={clickHandler}>Electronics</li>
                            </ul>
                            : null}
                    </li>

                    <li   className="nav-item m-1">
                        <Button className="li-btn"
                            onClick={() => setChevronOpen(!chevron)}>
                            <i className="fas fa-chevron-down"></i>
                        </Button>

                        {chevron ?
                            <ul className="drop-down">
                                <li    style={{ display: "inline" }} className="nav-item nav-drop-down" onClick={() => {
                                    history.push('/orders')
                                    setChevronOpen(!chevron)
                                }}>
                                orders
                                    </li>

                                <li  className="nav-item nav-drop-down" id="cog" onClick={() => {

                                    setChevronOpen(false)
                                    history.push('/update-user')
                                }}>
                                    update user
                                </li>
                                <li  className="nav-item nav-drop-down" id="star" onClick={() =>
                                    {setChevronOpen(false)
                                    history.push("/wishlist")}

                                }>
                                    wishlist
                                       <Badge className="badge" style={{ marginLeft: 5, padding:5 }} >{wishlist.length}</Badge>

                                </li>
                                <li  className="nav-item nav-drop-down" id="logout" onClick={logout}>
                                    logout
                                    </li>

                            </ul>
                            : null}
                </li>
                    <li  className="nav-item m-1">
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

const mapStateToProps  = state =>({cart:state.cart, wishlist:state.wishlist, ACTIVE_USER:state.ACTIVE_USER})
  export default  connect(mapStateToProps)(Navigation)