import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '../../babelrc'

Enzyme.configure({adapter: new Adapter()})
 // "test": "react-scripts test",
//  "setupFiles": ["<rootDir>/src/__tests__/setupEnzyme.js"],
//     "testPathIgnorePatterns": [
//       "<rootDir>/src/__tests__"
//     ],

// ,
//   "jest": {
//     "setupFiles":["<rootDir>/src/__tests__/setupEnzyme.js"],
//     "projects": [
//       "<rootDir>/src/__tests__"
//     ]
//   }