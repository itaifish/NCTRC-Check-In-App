import React from 'react';
import 'react-native/jest/setup';
import { NavigationContainer } from '@react-navigation/native';
import AuthFlowNavigator from './Index';

function App() {
    return (
        <NavigationContainer>
            <AuthFlowNavigator />
        </NavigationContainer>
    );
}

export default App; 