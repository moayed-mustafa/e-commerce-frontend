
const initialState = []
//  the shape of the cart should be
// [
//     item_id: {
//         image:str
//         count: integer
//     }
// ]
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