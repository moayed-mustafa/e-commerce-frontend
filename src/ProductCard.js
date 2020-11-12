

import React, { useState, useContext} from 'react'
import './index.css'
import ServerApi from './API/server'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'reactstrap'
import userContext from './userContext'
import { v4 as uuid } from 'uuid';


export default function ProductCard({ product }) {

    const [flash, setFlash] = useState({condition:false, message:"", backgroundColor: ""})

    const dispatch = useDispatch()

    const cart = useSelector(st => st.cart)
    const wishlist = useSelector(st => st.wishlist)


    function checkInCart(id) {
        if(cart.length ===0) return false
        return cart.some(item => item.id === id);

    }
    function checkInWishlist(id) {
        if (wishlist.length === 0) return false
        return wishlist.some(item => item.id === id);

    }


    const { _token, username } = useContext(userContext).current_user
    const key = uuid()

    async function cartEvent(e) {
        const product_id = e.target.parentElement.id || e.target.id
        const action = e.target.parentElement.name || e.target.name
        const type = action === "add" ? "ADD_TO_CART" : "REMOVE_FORM_CART"
        const message = action === "add" ? "Added To Cart" : "Removed From Cart"
        const backgroundColor = action === "add" ? "#FFB500" : "#F93800"

        const data = { _token, username, product_id, action }

        try {
            await ServerApi.cartAction( data)
            flashControl(message, backgroundColor)

                dispatch({type,product })
        } catch (e) {
            console.log(e)
        }

    }

    async function wishlistEvent(e) {
        const action = e.target.parentElement.name || e.target.name
        const type = action === "add" ? "ADD_TO_WISHLIST" : "REMOVE_FORM_WISHLIST"
        const message = action === "add" ? "Added To Wishlist" : "Removed From Wishlist"
        const backgroundColor = action === "add" ? "#FFB500" : "#F93800"
        const product_id = product.id
        console.log(e.target.id, product.id, action, type, username, _token)
        const data = { _token, username, product_id, action }
        // call server
        try {
            await ServerApi.wishlistAction(data)
            flashControl(message,backgroundColor)
                dispatch({type,product })

        } catch (e) {
            console.log(e)
        }

    }

    function flashControl(message, backgroundColor) {
        setFlash(data =>data = {
            condition: true,
            message ,
            backgroundColor

            })
            setTimeout(() => {
                setFlash(data =>data = {
                    condition: false,
                    message: "",
                    backgroundColor: ""

                    })
            }, 3000)
    }



    return (
        <div className="card-wrapper"  key={key}>
                <div className="product-img-wrapper">
                    <img className="product-img" src={product.image} alt="product-display"></img>
                </div>

                <div className="product-info" >
                    <div className="product-title" >
                        <h5>{product.title}</h5>
                    </div>
                    <div className="product-descripition">
                        <p>{product.description}</p>
                    </div>
                    <div className='product-price-buy' >
                    <b >{`Price: ${product.price}`}$</b>

                    <button id={product.id} name="add" onClick={cartEvent} >
                        <i name="add" className="fas fa-cart-plus" ></i>
                    </button>
                    {checkInCart(product.id) &&
                        <button id={product.id} name="remove" onClick={cartEvent} >
                             <i  name="remove" className="fas fa-minus-square" ></i>
                        </button>
                    }
                    {checkInWishlist(product.id) ?

                        <button name= "remove" onClick={wishlistEvent}>
                        <i name= "remove" className="fas fa-heart"></i>
                        </button> :
                        <button name="add"  onClick={wishlistEvent} >
                        <i  name="add" className="far fa-heart"></i>
                        </button>

                }
                </div>
                {flash.condition && <Alert style={{backgroundColor:flash.backgroundColor}} className="alert">{flash.message}</Alert>}
                </div>

            </div>
    )
}