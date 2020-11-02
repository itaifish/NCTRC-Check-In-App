
import React from "react";
import  AdminPassWord from '../screens/AdminPasswordScreen';
import  AdminPortal from '../screens/AdminPortalScreen';
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

describe('Admin Password renders', () => {
    it('Admin Password render', async() => {
      const tree = renderer.create(<AdminPassWord navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

describe('Admin Portal renders', () => {
    it('Admin Portal render', async() => {
      const tree = renderer.create(<AdminPortal navigation={props.navigation} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('Admin Portal elements', () => {
    it("Admin Portal elements", async() => {
       let wrapper =  shallow(<AdminPortal navigation={props.navigation} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('View').length).toBe(1); 

    })
   
});

describe('AdminPassWord elements', () => {
    it("AdminPassWord elements", async() => {
       let wrapper =  shallow(<AdminPassWord navigation={props.navigation} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(1); 
       expect(wrapper.find('Button').length).toBe(1); 
       expect(wrapper.find('View').length).toBe(1); 

    })
   
});
jest.useFakeTimers(); 