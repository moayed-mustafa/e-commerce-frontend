

import React, {useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import fetchProducts from './API/api'
import './index.css'
import ProductCard from './ProductCard'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


export default function Products() {

    const [dataFetched, setDataFetched] = useState(false)
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
            setDataFetched(data => data = !data)
        }
        fetchData()

    }, [dispatch])


    const products = useSelector(st => st.products)


    return (
        dataFetched?
        <div className="products-container">

                {
                    products.map(product => (
                        <ProductCard product={product} />
                    ))
                }
            </div> :
             <Loader
                type="Circles"
                color="#283350"
                height={250}
                width={250}
                style={{"marginTop":300}}
            />
    )
}




