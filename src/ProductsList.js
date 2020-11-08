

import React, {useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import fetchProducts from './API/api'
import './index.css'
import ProductCard from './ProductCard'



export default function Products() {

    const dispatch = useDispatch()
    // fetch products
    useEffect(() => {
        //  request to productsApi
        async function fetchData() {
            const response = await fetchProducts()
            dispatch({
                type: "CHANGE_PRODUCTS",
                products: response.data
            })
        }
        fetchData()
    }, [dispatch])


    const products = useSelector(st => st.products)


    return (
        <div className="products-container">
        {products.map(product => (
            <ProductCard product={product}/>
          ))}
        </div>
    )
}




