
import React, {useState, useEffect, useRef} from 'react'
import {  useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import ProductCard from './ProductCard'
import { v4 as uuid } from 'uuid';


export default function Category() {
    const { pathname } = useLocation()
    const [fakeLoad, setFakeLoad] = useState(false)
    const ref = useRef(fakeLoad)

    useEffect(() => {
        const timer = setTimeout(() => {
            setFakeLoad(!ref.current)
        },800)

        return () => {
            clearTimeout(timer)
            setFakeLoad(!fakeLoad)

        };

    })

    let param = pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length)

    if (param.indexOf('-') !== -1) {
        param = param.split('')
        param.splice(param.indexOf('-'), 1, " ")
        param = param.join('')
    }
    const products = useSelector(st => st.products)

    const category = products.filter(product => product.category === param)

    return (
        fakeLoad?
        <div className="products-container" >
                {
                    category.map(product => (
                        <ProductCard product={product} key={uuid()}/>
                    ))
                }
            </div> :
            <Loader
            type="ThreeDots"
            color="#FFB500"
            height={250}
            width={250}
                style={{ "marginTop": "300" }}
                key={uuid()}
        />

    )
}