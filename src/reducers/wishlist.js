

const initialState = []
export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            console.log(action)
            return state
        case "REMOVE_FORM_WISHLIST":
            console.log(action)
            return state
        case "CLEAR_WISHLIST":
            console.log(action)
            return state

        default:
            return state
    }

}