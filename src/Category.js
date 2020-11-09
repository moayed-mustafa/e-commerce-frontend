
import React, {useState, useEffect, useRef} from 'react'
import {  useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import ProductCard from './ProductCard'
import { v4 as uuid } from 'uuid';


export default function Category() {
    // const { category } = useParams()
    //  will use the pathname and slice it up because the easier way of using useParams is not working
    const { pathname } = useLocation()
    const [fakeLoad, setFakeLoad] = useState(false)
    const ref = useRef(fakeLoad)
    const key = uuid()

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
        <div className="products-container" key={key}>
                {
                    category.map(product => (
                        <ProductCard product={product} />
                    ))
                }
            </div> :
            <Loader
            type="ThreeDots"
            color="#FFB500"
            height={250}
            width={250}
            style={{"marginTop":"300"}}
        />

    )
}