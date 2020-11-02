
import React from "react";
import  CheckOutScreen from '../screens/CheckOutScreen';
import  CheckOutLandingScreen from '../screens/CheckOutLandingScreen';
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

describe('CheckOutLanding renders', () => {
    it('CheckOutLanding renders', async() => {
      const tree = renderer.create(<CheckOutLandingScreen navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

describe('CheckOutScreen renders', () => {
    it('CheckOutScreen render', async() => {
      const tree = renderer.create(<CheckOutScreen navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('CheckOutScreen elements', () => {
    it("CheckOutScreen elements", async() => {
       let wrapper =  shallow(<CheckOutScreen navigation={props.navigation} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(1); 
       expect(wrapper.find('View').length).toBe(1); 

    })
   
});

describe('CheckOutLanding elements', () => {
    it("CheckOutLanding elements", async() => {
       let wrapper =  shallow(<CheckOutLandingScreen navigation={props.navigation} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(2); 
       expect(wrapper.find('View').length).toBe(2); 

    })
   
});

jest.useFakeTimers(); 