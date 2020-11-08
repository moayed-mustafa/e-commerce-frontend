
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

            return state
        case "REMOVE_FORM_CART":

            return state
        case "CLEAR_CART":

            return state

        default:
            return state
    }

}