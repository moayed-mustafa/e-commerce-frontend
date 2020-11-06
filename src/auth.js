
import axios from 'axios'
import { decode } from 'jsonwebtoken'



const BASE_URL = "http://127.0.0.1:3001"


export default class Auth{
    static async signup(signup_data) {
        const res = await axios.post(`${BASE_URL}/users/signup`, signup_data)
        if (res.data._token) {
            let { username } = decode(res.data._token);
            return { _token:res.data._token, username }
        }


    }

        static async login(login_data) {
            const res = await axios.post(`${BASE_URL}/login`, login_data)
            if (res.data._token) {
                let { username } = decode(res.data._token);
                return { _token:res.data._token, username }

            }

        }

    // static setInLS(_token) {
    //     let { username } = decode(_token);
    //     let user = { _token, username }
    //     localStorage.setItem('user',JSON.stringify(user) )


    // }

    static logout() {
        localStorage.removeItem('user');
    }



}