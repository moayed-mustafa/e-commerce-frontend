

const initialState = { username: null, _token: null }
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "STORE_USER":
            console.log(action)
            return Object.assign({}, state, {username:action.user.username, _token:action.user._token})
        case "REMOVE_USER":
            return state;
        default:
            return state
    }

}