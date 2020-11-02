
import React from "react";
import  CovidInformationScreen from '../screens/CovidInformationScreen';
import  COVIDErrorScreen from '../screens/COVIDErrorScreen';
import  ErrorParams from '../screens/COVIDErrorScreen';
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
        }
    },  
    errorRoute: {
        params: {
            reason: "string",
        }

    }
}


describe('CovidInformationScreen renders', () => {
    it('CovidInformationScreen renders', () => {
      const tree = renderer.create(<CovidInformationScreen navigation={props.navigation} route={props.route} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

describe('COVIDErrorScreen renders', () => {
    it('COVIDErrorScreen render', () => {
      const tree = renderer.create(<COVIDErrorScreen navigation={props.navigation} route={props.errorRoute} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('CovidInformationScreen elements', () => {
    it("CovidInformationScreen elements", () => {
       let wrapper =  shallow(<CovidInformationScreen navigation={props.navigation} route={props.route} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(18); 
       expect(wrapper.find('View').length).toBe(6); 
       expect(wrapper.find('ScrollView').length).toBe(1); 

    })
   
});

describe('COVIDErrorScreen elements', () => {
    it("COVIDErrorScreen elements", () => {
       let wrapper =  shallow(<COVIDErrorScreen navigation={props.navigation} route={props.errorRoute} />);
       expect(wrapper.find('Image').length).toBe(2); 
       expect(wrapper.find('Text').length).toBe(2); 
       expect(wrapper.find('View').length).toBe(2); 

    })
   
});
jest.useFakeTimers(); 