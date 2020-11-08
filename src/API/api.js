
// * making a request to my remote api
// fetch('https://fakestoreapi.com/products')
// .then(res=>res.json())
// .then(json=>console.log(json))
import axios from "axios"

const URL =" https://fakestoreapi.com/products"

export default async function fetchProducts(){

    return await axios.get(URL)
}
