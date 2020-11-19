
const initialState = []
export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_PRODUCTS":
            action.products.map(product => (
                product.price =
                new Intl.NumberFormat('Ar-ar', { style: 'currency', currency: 'AED' }).format(product.price)
            ))

            return action.products

        default:
            return state
    }

}