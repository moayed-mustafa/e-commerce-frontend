

import React, {useState, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import './index.css'
import userContext from './userContext'
import { Alert } from 'reactstrap'
import './index.css'
import ServerApi from './API/server'
import {useHistory} from 'react-router-dom'


export default function Cart() {
    const cart = useSelector(st => st.cart)

    let total = cart.length === 1 && cart[0].quantity === 1 ? cart[0].price :
        cart.reduce((acc, currVal) => { return acc + (currVal.price) * currVal.quantity }, 0)
    const [flash, setFlash] = useState({
        condition: false,
        message: "",
        backgroundColor: ""
    })
    const history = useHistory()


    const dispatch = useDispatch()
    const { _token, username } = useContext(userContext).current_user


    function flashControl(message, backgroundColor) {
        setFlash(data =>data = {
            condition: true,
            message ,
            backgroundColor

            })

    }



    async function Purchase() {
        //  * Flash stuff
        try {
            await ServerApi.order({_token, username})

            flashControl("Purchase Completed Successfully", "#FFB500")
            // dispatch and change the state
            setTimeout(() => {

                dispatch({
                    type:"CLEAR_CART"
                })
                history.push('/')

            }, 1500)
        } catch (e) {
            flashControl("Something went Wrong","#F93800" )
        }
    }

    async function cartEvent(e) {
        const product_id = e.target.parentElement.id || e.target.id
        const action = e.target.parentElement.name || e.target.name
        const type = action === "add" ? "ADD_TO_CART" : "REMOVE_FORM_CART"


        try {
            const data = { _token, username, product_id, action }
            await ServerApi.cartAction(data)
            const product = cart.filter(p => p.id === Number(product_id))[0]

            dispatch({
                type,
                product
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        cart.length === 0 ?
            <h3 className="empty-cart"> Your cart is empty </h3> :
                <div className='cart-div' key={uuid()}>
                <ul className='cart-ul' key={uuid()}>
                    {
                        cart.map(product =>
                            <div className="cart-product" key={uuid()}>
                                <li className="cart-image">
                                    <img src={product.image} alt={product.title}></img>
                                </li>
                                <li className="cart-title">
                                    {`${product.quantity} X ${product.title}`}
                                </li>
                                <li className="cart-price">
                                    Price: {new Intl.NumberFormat('En-us', { style: 'currency', currency: 'AED' }).format(product.price)}
                                </li>
                                <span className="cart-btns">
                                    <button id={product.id} name="add"  onClick={cartEvent} >
                                        <i name="add" className="fas fa-plus-square" ></i>
                                    </button>
                                    <button id={product.id} name="remove"  onClick={cartEvent}>
                                        <i name="remove" className="fas fa-minus-square" ></i>
                                    </button>

                                </span>
                                <hr></hr>
                            </div>
                        )
                    }


                </ul>
                 <span className="total-span">
                    <button onClick={Purchase}>Complete Purchase</button>
                    <h5> {new Intl.NumberFormat('En-us', { style: 'currency', currency: 'AED' }).format(total)}</h5>
                </span>
                    <div>
                        {flash.condition && <Alert style={{ backgroundColor: flash.backgroundColor }}
                            className="alert">{flash.message}
                        </Alert>}
                    </div >

            </div >




    )
}


