
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import rootReducer from '../reducers/rootReducer';
import Cart from "../Cart";
import UserContext from '../userContext'



let store = createStore(rootReducer);

let current_user= {
    username: "carter", _token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcnRlciIsImlhdCI6MTYwNTMwMjY3Nn0.MsDqmb1zxzzHTsI38EwdYJoOIWIMcJGmN1XL0Tm2Trw"
}

function checkUser(user) {
    if (!user || !user._token) {
        localStorage.removeItem("user");

    }else {
            localStorage.setItem("user",JSON.stringify(user))
    }

}

describe('<Cart />', () => {

    it('passes smoke test', function() {
        render((
            <UserContext.Provider value={{current_user, set_current_user:checkUser}}>
                <Provider store={store}>
                    <Cart />
                </Provider>

            </UserContext.Provider>
        ));
    });

    it('passes snapshot test', function() {
        const { asFragment } = render((
            <UserContext.Provider value={{current_user, set_current_user:checkUser}}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </UserContext.Provider>
        ));
        expect( asFragment() ).toMatchSnapshot();
    });

});
