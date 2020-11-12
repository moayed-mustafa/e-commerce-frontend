
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // for components that has redux store
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// Component to be tested
import Cart from '../Cart';


//  mockStore
const mockStore = configureStore()
// initialState
const initialState = {
    products: [],
    cart: [],
    wishlist:[]
}
// store
const store = mockStore(initialState);



describe('<Cart />', () => {
    describe('render()', () => {
      test('renders the component', () => {
          const wrapper = shallow(<Cart store={store}/>);
        const component = wrapper.dive();

        expect(toJson(component)).toMatchSnapshot();
      });
    });
  });