
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
    const [flash, setFlash] = useState({
        condition: false,
        message: "",
        backgroundColor: ""
    })

    async function wishlistEvent(e) {
        const product_id = e.target.parentElement.id || e.target.id
        const action = e.target.parentElement.name || e.target.name

        try {
            const data = { _token, username, product_id, action }
            await ServerApi.cartAction(data)
            await ServerApi.wishlistAction({ _token, username, product_id, action:"remove" })
            const product = wishlist.filter(p => p.id === Number(product_id))[0]
            dispatch({
                type:"ADD_TO_CART",
                product
            })
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
                        <div className="wishlist-product">
                            <li className="cart-image">
                                <img src={product.image} alt={product.title}></img>
                            </li>
                            <li className="cart-title">
                                {product.title}
                            </li>
                            <li className="cart-price">
                                Price: {product.price }
                            </li>
                            <span className="wishlist-btns">
                                <button id={product.id} name="add"  onClick={wishlistEvent} >
                                    <i name="add" className="fas fa-plus-square" ></i>
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