

import React from 'react'
import { useSelector, uesDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import './index.css'


export default function Cart() {
    const cart = useSelector(st => st.cart)
    console.log(cart)
    const total = cart.reduce((acc, currVal) => { return acc + currVal.price * currVal.count }, 0)
    console.log(total)


    return (



        cart.length === 0 ?
            <h1>No items in your cart</h1>:
        <div className='cart-div'>
            <ul className= 'cart-ul' key={uuid()}>
            {
                cart.map(product =>
                    <div className="cart-product">
                        <li className="cart-image">
                            <img src= {product.image} alt={product.title}></img>
                        </li>
                        <li className="cart-title">
                            { `${product.count} X ${product.title}`}
                        </li>
                        <li className="cart-price">
                            Price: {product.price * product.count}
                        </li>
                        <span className="cart-btns">
                            <button id={product.id} name="add" >
                            <i  name="add" className="fas fa-plus-square"></i>
                            </button>
                            <button id={product.id} name="remove" >
                                <i  name="remove" className="fas fa-minus-square" ></i>
                            </button>

                        </span>
                        <hr></hr>
                    </div>
                )
            }
                </ul>
                <span className="total-span">
                    <button>Order</button>
                    <h5>Total:{total}</h5>

                </span>
        </div >



    )
}