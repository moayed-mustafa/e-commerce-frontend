

const initialState = []
export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_WISHLIST":

            action.product.count = 1;

            return [...state, action.product]
        case "REMOVE_FORM_WISHLIST":

            return state.filter(p => p.id !== action.product.id)
        case "CLEAR_WISHLIST":

            return []

        default:
            return state
    }

}