
import axios from 'axios'

// Making requests to my server



// should have carts after port
const BASE_URL = "http://127.0.0.1:3001"

export default class ServerApi{
    //  cart functions

    static async cartAction(data) {
        const { product_id, username, action, _token } = data;
        await axios.post(`${BASE_URL}/carts/${username}/${action}`,{product_id, _token} )

    }

}