

import React, {useEffect, useState, useContext } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import fetchProducts from './API/api'
import './index.css'
import ProductCard from './ProductCard'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { v4 as uuid } from 'uuid';
import ServerApi from './API/server'
import userContext from './userContext'





export default function Products() {


    const products = useSelector(st => st.products)
    const [dataFetched, setDataFetched] = useState(products.length > 0 ? true : false)
    const dispatch = useDispatch()
    const { _token, username } = useContext(userContext).current_user
    // fetch products
    useEffect(() => {
        try {


            //  request to productsApi
            async function getProducts() {
                const response = await fetchProducts()
                dispatch({
                    type: "CHANGE_PRODUCTS",
                    products: response.data
                })
                setDataFetched(true)
            }
            async function getItemsFromCart() {
                let newCart = await ServerApi.getItemsFromCart({ _token, username })
                let ids = newCart.map(item => [item.product_id, item.quantity])

                let final=[];
                for (let pair of ids) {
                    for (let product of products) {
                        if (product.id === pair[0]) {
                            let cartProduct = {...product, quantity: pair[1]}
                            final.push(cartProduct)
                        }
                    }
                }

                dispatch({
                    type: "FILL_CART",
                    cart:final
                })
            }

            async function getItemsFromWishlist() {
                let newWishlist = await ServerApi.getItemsFromWishlist({ _token, username })

                let ids = newWishlist.map(item => item.product_id)
                let final=[];
                for (let id of ids) {
                    for (let product of products) {
                        if (product.id === id) {
                            final.push(product)
                        }
                    }
                }



                dispatch({
                    type: "FILL_WISHLIST",
                    wishlist:final
                })
            }
            getItemsFromCart()
            getProducts()
            getItemsFromWishlist()
        } catch (e) {
            // console.log(e)
            console.log('API not working')
        }
        return () => {
            // clean up
        }


    }, [])




    return (
        dataFetched?
        <div className="products-container" key={uuid()} >

                {
                    products.map(product => (
                        <ProductCard product={product} key={uuid()} />
                    ))
                }
            </div> :
             <Loader
                type="ThreeDots"
                color="#F93800"
                height={250}
                width={250}
                style={{"marginTop":"300"}}
            />
    )
}




