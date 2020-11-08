
import axios from 'axios'



const BASE_URL = "http://127.0.0.1:3001"


export default class Auth{
    static async signup(signup_data) {
        const res = await axios.post(`${BASE_URL}/users/signup`, signup_data)
        if (res.data._token) {
            let username = signup_data.username
            return{_token:res.data._token, username}

        }


    }

        static async login(login_data) {
            const res = await axios.post(`${BASE_URL}/login`, login_data)
            if (res.data._token) {
                let username = login_data.username
                return{_token:res.data._token, username}

            }

        }

    static setInLS(_token, username) {

        let user = { _token, username }
        localStorage.setItem('user',JSON.stringify(user) )


    }

    static logout() {
        localStorage.removeItem('user');
    }



}