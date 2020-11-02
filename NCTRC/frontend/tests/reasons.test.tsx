
import React from "react";
import  ReasonScreen from '../screens/ReasonScreen';
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

describe('Reasons renders', () => {
    it('Reasons render', () => {
      const tree = renderer.create(<ReasonScreen navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('ReasonScreen elements', () => {
    it("ReasonScreen elements", () => {
       let wrapper =  shallow(<ReasonScreen navigation={props.navigation} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(7); 
       expect(wrapper.find('View').length).toBe(1); 
    })
   
});

jest.useFakeTimers(); 