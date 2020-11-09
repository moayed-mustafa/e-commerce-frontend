
// * making a request to my remote api

import axios from "axios"

const URL =" https://fakestoreapi.com/products"

export default async function fetchProducts(){
    return await axios.get(URL)
}
