
import React from "react";
import  RiskScreen from '../screens/RisksScreen';
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
    route: {
        params: {
            firstName: "string",
            lastName: "string",
            email: "string",
            tempurature: 0,
        }
    }, 
}

describe('Risk Screen renders', () => {
    it('Risk Screen  render', () => {
      const tree = renderer.create(<RiskScreen navigation={props.navigation} route={props.route} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('Risk elements', () => {
    it("Risk Screen elements", () => {
       let wrapper =  shallow(<RiskScreen navigation={props.navigation} route={props.route} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(10); 
       expect(wrapper.find('View').length).toBe(2); 
    })
   
});

jest.useFakeTimers(); 