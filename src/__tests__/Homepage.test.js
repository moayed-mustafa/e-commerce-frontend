
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";


import rootReducer from '../reducers/rootReducer';
import Homepage from "../Homepage";
import UserContext from '../userContext'




let store = createStore(rootReducer);

let current_user= {
    username: "carter", _token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcnRlciIsImlhdCI6MTYwNTUzMTE1MH0.Ubq4MkrWWL4a3Aw9vIuBIh0ZEv6tsGfpTH_hWAdjEbE"

}

function checkUser(user) {
    if (!user || !user._token) {
        localStorage.removeItem("user");

    }else {
            localStorage.setItem("user",JSON.stringify(user))
    }

}

describe('<Homepage/>', () => {

    it('passes smoke test', function() {
        render((
            <UserContext.Provider value={{ current_user, set_current_user: checkUser }}>
                <MemoryRouter>
                <Provider store={store}>
                    <Route>
                            <Homepage />
                    </Route>
                </Provider>
                </MemoryRouter>

            </UserContext.Provider>
        ));
    });

    it('passes snapshot test', async function() {
        const { asFragment } = render((
            <UserContext.Provider value={{current_user, set_current_user:checkUser}}>
                 <MemoryRouter>
                <Provider store={store}>
                    <Route>
                            <Homepage />

                    </Route>
                </Provider>
                </MemoryRouter>
            </UserContext.Provider>
        ));
        expect( asFragment() ).toMatchSnapshot();
    });

});
