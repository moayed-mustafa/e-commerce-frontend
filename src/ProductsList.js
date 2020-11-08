

import React, { useContext, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import fetchProducts from './API/api'
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle, Button, Col, Row
//   } from 'reactstrap';
import './index.css'



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

            <div className="product-card">
                <img src={product.image} alt="product" className="product-image"></img>
                <h4>{product.title}</h4>
                <button>Description</button>
            </div>
        ))}
        </div>
    )
}
