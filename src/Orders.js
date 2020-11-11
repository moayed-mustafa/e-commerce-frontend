

import React, { useState, useEffect, useContext } from 'react'
import ServerApi from './API/server'
import userContext from './userContext'
import { Alert } from 'reactstrap'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid';



export default function Orders() {

    const { _token, username } = useContext(userContext).current_user
    const [orders, setOrders] = useState([])

    const products = useSelector(st => st.products)


    useEffect(() => {

        async function fetchOrders() {
            //  * WARNING: too much looping!
            console.log("fetching")
            try {
                const data = await ServerApi.orders({ _token, username })

                let ordersRecord = [];
                const ids = data.map(item => item.product_id)
                for (let id of ids){
                    for (let product of products){
                        if (id === product.id) {
                            // in case there is one product that shows up in two different orders
                            // destructure the one that comes first
                            const order = data.filter(item => item.product_id === id)[0]
                            //  destructure some data from that array
                            const { quantity, order_date } = order
                            // push it to the display array
                            ordersRecord.push({ ...product, quantity, order_date })
                            // remove the item you destructured earlier so only one record with the same id remains on data
                            data.splice(data.indexOf(order),1)


                            }
                    }
                }
                setOrders(ordersRecord)


            } catch (e) {
                console.log(e)
            }

        }
        fetchOrders()

    }, [])

    return (
        orders.length > 0 ? <div className='cart-div' key={uuid()}>
        <ul className='cart-ul' key={uuid()}>
            {
                orders.map(product =>
                    <div className="wishlist-product">
                        <li className="cart-image">
                            <img src={product.image} alt={product.title}></img>
                        </li>
                        <li className="cart-title">
                           {product.quantity} X {product.title}
                        </li>
                        <li className="cart-price">
                            Price: {product.price * product.quantity }
                        </li>
                        <li className="cart-price">
                            Date: {product.order_date.slice(0,product.order_date.indexOf("T")) }
                        </li>
                        <hr></hr>
                    </div>
                )
            }
        </ul>

        </div > :
            <div>
            <Alert className="orders-alert" > You have not made any orders</Alert>
        </div >


    )
}