
import axios from 'axios'

// Making requests to my server



// should have carts after port
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:3001"

export default class ServerApi{
    //  cart functions

    static async cartAction(data) {
        const { product_id, username, action, _token } = data;
         await axios.post(`${BASE_URL}/carts/${username}/${action}`, { product_id, _token })

    }

    static async getItemsFromCart(data) {
        const { username,_token } = data;
        const result = await axios.post(`${BASE_URL}/carts/${username}/`, { _token })
        return result.data
    }
    static async wishlistAction(data) {
        const { product_id, username, action, _token } = data;
        await axios.post(`${BASE_URL}/wishlist/${username}/${action}`, { product_id, _token })

    }
    static async getItemsFromWishlist(data) {
        const { username,_token } = data;
        const result = await axios.post(`${BASE_URL}/wishlist/${username}/`, { _token })
        return result.data
    }

    static async order(data) {
        const { username, _token } = data;
        await axios.post(`${BASE_URL}/orders/${username}/order`, {_token})
    }
    static async orders(data) {

        const { username, _token } = data;
        //* */  get request don't take bodies, just change the rouet on the backend
        const res = await axios.post(`${BASE_URL}/orders`, {username, _token});
        return res.data
    }

    static async updateUser(data, username) {

        let valuesObj = {};
        const valuesList = Object.entries(data).filter(val => val[1].length !== 0);
        valuesList.map(item => valuesObj[item[0]] = item[1]);
        await axios.patch(`${BASE_URL}/users/${username}`, valuesObj)

    }

}