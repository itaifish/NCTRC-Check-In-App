import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthFlowNavigator from './index';

export default function App() {
    return (
        <NavigationContainer>
            <AuthFlowNavigator />
        </NavigationContainer>
    );
}
