
import React from "react";
import  HomeScreen from '../screens/HomeScreen';
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

describe('Homescreen renders', () => {
    it('App render', () => {
      const tree = renderer.create(<HomeScreen navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('HomeScreen elements', () => {
    it("Home Screen elements", () => {
       let wrapper =  shallow(<HomeScreen navigation={props.navigation} />);
       expect(wrapper.find('Button').length).toBe(1); 
       expect(wrapper.find('Image').length).toBe(1); 
       expect(wrapper.find('Text').length).toBe(2); 
       expect(wrapper.find('View').length).toBe(2); 
    })
   
});

jest.useFakeTimers(); 