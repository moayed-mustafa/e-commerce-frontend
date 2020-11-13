
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";


import rootReducer from '../reducers/rootReducer';
import ProductCard from "../ProductCard";
import UserContext from '../userContext'



let store = createStore(rootReducer);
const product = {
    category: "men clothing",
description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
id: 2,
image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
price: 22.3,
title: "Mens Casual Premium Slim Fit T-Shirts "
}

let current_user= {
    username: "carter", _token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcnRlciIsImlhdCI6MTYwNTMwMjY3Nn0.MsDqmb1zxzzHTsI38EwdYJoOIWIMcJGmN1XL0Tm2Trw"

}

function checkUser(user) {
    if (!user || !user._token) {
        localStorage.removeItem("user");

    }else {
            localStorage.setItem("user",JSON.stringify(user))
    }

}

describe('<ProductCard/>', () => {

    it('passes smoke test', function() {
        render((
            <UserContext.Provider value={{ current_user, set_current_user: checkUser }}>
                <MemoryRouter>
                <Provider store={store}>
                    <Route>
                        <ProductCard product={ product}/>
                    </Route>
                </Provider>
                </MemoryRouter>

            </UserContext.Provider>
        ));
    });

    it('passes snapshot test', function() {
        const { asFragment } = render((
            <UserContext.Provider value={{current_user, set_current_user:checkUser}}>
                 <MemoryRouter>
                <Provider store={store}>
                    <Route>
                            <ProductCard product={ product}/>
                    </Route>
                </Provider>
                </MemoryRouter>
            </UserContext.Provider>
        ));
        expect( asFragment() ).toMatchSnapshot();
    });

});
