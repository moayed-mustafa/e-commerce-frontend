
// This version uses connected component
import React from 'react'
import {render, cleanup} from '@testing-library/react'
import ConnectedCart from '../Cart'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers/rootReducer'
import '@testing-library/jest-dom/extend-expect'
import UserContext from '../userContext'
// import UserContext from '../userContext'




afterEach(cleanup)

const current_user = {username: "test", _token:"1234"}

function renderWithRedux(component, { initialState = { products: [], cart: [], wishlist: [] },
     store = createStore(reducer, initialState) } = {}) {
     return {
          ...render(
               <UserContext.Provider value={current_user}>
                    <Provider store={store}>{component}</Provider>

               </UserContext.Provider>
          )
     }
}


it('renders without crashing', () => {

     renderWithRedux(

        //  should wrap this with a userContext but will throw an error
               <ConnectedCart/>

          )
})
{/* <UserContext></UserContext> */}
