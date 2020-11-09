

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


    function checkInCart(id) {
        if(cart.length ===0) return false

        return cart.some(item => item.id === id);

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
            setFlash(data =>data = {
                condition: true,
                message,
                backgroundColor

                })
                setTimeout(() => {
                    setFlash(data =>data = {
                        condition: false,
                        message: "",
                        backgroundColor: ""

                        })
                }, 3000)

                dispatch({
                    type,
                    product
                })

        } catch (e) {
            console.log(e)
        }

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

                    {/* the wishlist button is the same, the difference is that it's either */}
                    {/* a filled heart or not */}
                    <button >
                        <i className="far fa-heart"></i>
                    </button>
                </div>
                {flash.condition && <Alert style={{backgroundColor:flash.backgroundColor}} className="alert">{flash.message}</Alert>}
                </div>

            </div>
    )
}