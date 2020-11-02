
import React from "react";
import  SignInScreen from '../screens/SignInScreen';
import  SignInLandingScreen from '../screens/SignInLandingScreen';
import { shallow, configure } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

const props = {
    navigation: {
        addListener: jest.fn(), 
        canGoBack: jest.fn(), 
        dangerouslyGetParent: jest.fn(), 
        dangerouslyGetState: jest.fn(), 
        dispatch: jest.fn(), 
        goBack: jest.fn(), 
        isFocused: jest.fn(), 
        navigate: jest.fn(), 
        pop: jest.fn(), 
        popToTop: jest.fn(), 
        push: jest.fn(), 
        removeListener: jest.fn(), 
        replace: jest.fn(), 
        reset: jest.fn(), 
        setOptions: jest.fn(), 
        setParams: jest.fn(), 
    }, 
}

describe('SignInScreenLanding renders', () => {
    it('App render', async() => {
      const tree = renderer.create(<SignInLandingScreen navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

describe('SignInScreen renders', () => {
    it('App render', async() => {
      const tree = renderer.create(<SignInScreen navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('SignInScreen elements', () => {
    it("SignInScreen elements", async() => {
       let wrapper =  shallow(<SignInScreen navigation={props.navigation} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(1); 
       expect(wrapper.find('View').length).toBe(1); 

    })
   
});

describe('SignInLanding elements', () => {
    it("SignInLanding elements", async() => {
       let wrapper =  shallow(<SignInLandingScreen navigation={props.navigation} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(2); 
       expect(wrapper.find('View').length).toBe(2); 

    })
   
});
jest.useFakeTimers(); 