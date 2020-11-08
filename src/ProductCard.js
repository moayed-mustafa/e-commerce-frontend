

import React from 'react'
import './index.css'


export default function ProductCard({product}) {
    console.log(product)
    return (
        <div className="card-wrapper">
                <div className="product-img-wrapper">
                    <img className="product-img" src={product.image} alt="product-display"></img>
                </div>
                <div className="product-info">
                    <div className="product-title">
                        <h5>{product.title}</h5>
                    </div>
                    <div className="product-descripition">
                        <p>{product.description}</p>
                    </div>
                    <div className='product-price-buy'>
                        <button>{`Price: ${product.price}`}$</button>
                        <button ><i class="fas fa-cart-plus"></i></button>
                        <button ><i class="far fa-heart"></i></button>
                    </div>
                </div>

            </div>
    )
}