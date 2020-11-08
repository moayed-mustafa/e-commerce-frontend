
const initialState = []
export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_PRODUCTS":
            return action.products

        default:
            return state
    }

}