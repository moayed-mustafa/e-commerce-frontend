
import React, {useState} from 'react'
import './Navigation.css'
import { Button } from 'reactstrap'


  import {NavLink} from 'react-router-dom'


export default function Navigation() {
    let [categoriesOpen, setCategoriesOpen] = useState(false)
    let [shevronOpen, setShevronOpen] = useState(false)

    function LoggedInViewNav() {


        return (
        <ul className="main-nav">
                <li className="nav-item nav-brand m-1">
                    <Button className ="btn-brand" >Shopper</Button>
                </li>
                <span className="li-span">
                <li className="nav-item m-1">
                    <Button className="li-btn"
                        onClick={()=> setCategoriesOpen(!categoriesOpen)}>Categories</Button>

                        {categoriesOpen ?
                            <ul className="drop-down">
                                <li className="nav-item nav-drop-down">men clothing</li>
                                <li className="nav-item nav-drop-down">women clothing</li>
                                <li className="nav-item nav-drop-down">jewelery</li>
                                <li className="nav-item nav-drop-down">electronics</li>
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
                                    <li className="nav-item nav-drop-down">
                                        <i className="fas fa-sign-out-alt"></i>
                                    </li>
                            </ul>
                            : null}
                </li>
                    <li className="nav-item m-1">
                        <Button className="li-btn">
                            <i className="fas fa-shopping-cart"></i>
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
                    <Button className ="btn-brand" >Shopper</Button>
                </li>
                <span className="li-span">
                    <li className="nav-item m-1">
                      <Button  className="li-btn">Login</Button>
                    </li>
                    <li className="nav-item m-1">
                        <Button  className="li-btn">Signup</Button>
                    </li>
                </span>
            </ul>

        );

    }





    return (
        <div>
            {LoggedInViewNav()}
            {/* {LoggedOutViewNav()} */}
        </div>
    )
}