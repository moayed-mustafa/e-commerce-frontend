
const initialState = []

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_CART":

            const product = state.find(product=> product.id === action.product.id)
            if (product === undefined) {
                // first time shop
                action.product.count = 1;
                return [...state, action.product]
            } else {
                action.product.count += 1;
                let newState = state.filter(p => p.id !== product.id)
                newState.push(action.product)
                return newState

            }

        case "REMOVE_FORM_CART":
            if (action.product.count > 1) {
                action.product.count -= 1;
                let newState = state.filter(p => p.id !== action.product.id)
                newState.push(action.product)
                return newState
            }
            return state.filter(p => p.id !== action.product.id)

        case "CLEAR_CART":
            return []

        default:
            return state
    }

}