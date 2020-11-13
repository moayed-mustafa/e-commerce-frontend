
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import rootReducer from '../reducers/rootReducer';
import Login from "../Login";
import UserContext from '../userContext'



let store = createStore(rootReducer);

let current_user= {
    username: "Loginer", _token:
        "123"
}

function checkUser(user) {
    if (!user || !user._token) {
        localStorage.removeItem("user");

    }else {
            localStorage.setItem("user",JSON.stringify(user))
    }

}

describe('<Login />', () => {

    it('passes smoke test', function() {
        render((
            <UserContext.Provider value={{current_user, set_current_user:checkUser}}>
                <Provider store={store}>
                    <Login />
                </Provider>

            </UserContext.Provider>
        ));
    });

    it('passes snapshot test', function() {
        const { asFragment } = render((
            <UserContext.Provider value={{current_user, set_current_user:checkUser}}>
                <Provider store={store}>
                    <Login />
                </Provider>
            </UserContext.Provider>
        ));
        expect( asFragment() ).toMatchSnapshot();
    });

});
