
import React, {useState, useEffect, useRef} from 'react'
import {  useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import ProductCard from './ProductCard'


export default function Category() {
    // const { category } = useParams()
    //  will use the pathname and slice it up because the easier way of using useParams is not working
    const { pathname } = useLocation()
    const [fakeLoad, setFakeLoad] = useState(false)
    const ref = useRef(fakeLoad)

    useEffect(() => {
        const timer = setTimeout(() => {
            setFakeLoad(!ref.current)
        },1500)

        return () => clearTimeout(timer);

    })


    let param = pathname.slice(pathname.lastIndexOf('/') +1, pathname.length)
    const products = useSelector(st => st.products)
    const category = products.filter(product => product.category === param)
    return (
        fakeLoad?
        <div className="products-container">

                {
                    category.map(product => (
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