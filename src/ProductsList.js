

import React, {useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import fetchProducts from './API/api'
import './index.css'
import ProductCard from './ProductCard'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { v4 as uuid } from 'uuid';



export default function Products() {


    const products = useSelector(st => st.products)
    const [dataFetched, setDataFetched] = useState(products.length > 0 ? true : false)
    const dispatch = useDispatch()
    // fetch products
    useEffect(() => {
        try {

            console.log('fetching')
            //  request to productsApi
            async function fetchData() {
                const response = await fetchProducts()
                dispatch({
                    type: "CHANGE_PRODUCTS",
                    products: response.data
                })
                setDataFetched(true)
            }
            fetchData()
        } catch (e) {
            console.log(e)
            console.log('API not working')
        }


    }, [])




    return (
        dataFetched?
        <div className="products-container" key={uuid()} >

                {
                    products.map(product => (
                        <ProductCard product={product} />
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




