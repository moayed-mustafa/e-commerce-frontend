
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";


import rootReducer from '../reducers/rootReducer';
import Navigation from "../Navigation";
import UserContext from '../userContext'



let store = createStore(rootReducer);

let current_user= {
    username: "carter", _token:"123"

}

function checkUser(user) {
    if (!user || !user._token) {
        localStorage.removeItem("user");

    }else {
            localStorage.setItem("user",JSON.stringify(user))
    }

}

describe('<Navigation />', () => {

    it('passes smoke test', function() {
        render((
            <UserContext.Provider value={{ current_user, set_current_user: checkUser }}>
                <MemoryRouter>
                <Provider store={store}>
                    <Route>
                        <Navigation />
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
                        <Navigation />
                    </Route>
                </Provider>
                </MemoryRouter>
            </UserContext.Provider>
        ));
        expect( asFragment() ).toMatchSnapshot();
    });

});
