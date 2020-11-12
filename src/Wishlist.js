
import React ,{ useState, useContext} from 'react'
import ServerApi from './API/server'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'reactstrap'
import userContext from './userContext'
import { v4 as uuid } from 'uuid';


export default function Wishlist() {

    const wishlist = useSelector(st => st.wishlist)
    // const [isEmpty, setIsEmpty] = useState(wishlist.length === 0)
    const dispatch = useDispatch()
    const { _token, username } = useContext(userContext).current_user
    const [flash] = useState({
        condition: false,
        message: "",
        backgroundColor: ""
    })

    async function wishlistEvent(e) {
        const product_id = e.target.parentElement.id || e.target.id
        const action = e.target.parentElement.name || e.target.name
        const product = wishlist.filter(p => p.id === Number(product_id))[0]

        try {
            const data = { _token, username, product_id, action }
            if (action === "add") {
                await ServerApi.cartAction(data)
                dispatch({
                    type:"ADD_TO_CART",
                    product
                })
            }
            await ServerApi.wishlistAction({ _token, username, product_id, action:"remove" })


            dispatch({
                type:"REMOVE_FORM_WISHLIST",
                product
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (wishlist.length === 0?
        <h3 className="empty-cart"> Make a wish</h3> :
            <div className='cart-div' key={uuid()}>
            <ul className='cart-ul' key={uuid()}>
                {
                    wishlist.map(product =>
                        <div className="wishlist-product" key={uuid()}>
                            <li className="cart-image" key={uuid()}>
                                <img src={product.image} alt={product.title}></img>
                            </li>
                            <li className="cart-title" key={uuid()}>
                                {product.title}
                            </li>
                            <li className="cart-price" key={uuid()}>
                                Price: {product.price }
                            </li>
                            <span className="wishlist-btns" key={uuid()}>
                                <button id={product.id} name="add"  onClick={wishlistEvent} >
                                    <i name="add" className="fas fa-plus-square" ></i>
                                </button>
                                <button id={product.id} name="remove"  onClick={wishlistEvent} >
                                    <i name="remove" className="fas fa-minus-square" ></i>
                                </button>


                            </span>
                            <hr></hr>
                        </div>
                    )
                }
            </ul>
                <div>
                    {flash.condition && <Alert style={{ backgroundColor: flash.backgroundColor }}
                        className="alert">{flash.message}
                    </Alert>}
                </div >

        </div >)
}