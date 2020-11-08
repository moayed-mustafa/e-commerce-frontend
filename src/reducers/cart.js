
const initialState = []
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            console.log(action)
            return state
        case "REMOVE_FORM_CART":
            console.log(action)
            return state
        case "CLEAR_CART":
            console.log(action)
            return state

        default:
            return state
    }

}