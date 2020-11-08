

const initialState = []
export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_WISHLIST":

            return state
        case "REMOVE_FORM_WISHLIST":

            return state
        case "CLEAR_WISHLIST":

            return state

        default:
            return state
    }

}