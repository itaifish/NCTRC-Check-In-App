import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AdminPasswordScreen from './screens/AdminPasswordScreen';
import AdminPortalScreen from './screens/AdminPortalScreen';
import CheckOutLandingScreen, { CheckOutParams } from './screens/CheckOutLandingScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import CovidErrorScreen, { ErrorParams } from './screens/COVIDErrorScreen';
import CovidInformationScreen, { InfoParams } from './screens/CovidInformationScreen';
import MaxCapScreen from './screens/MaxCapScreen';
import ReasonsScreen from './screens/ReasonScreen';
import RisksScreen, { RisksParams } from './screens/RisksScreen';
import SignInLandingScreen, { SignInParams } from './screens/SignInLandingScreen';
import SignInScreen from './screens/SignInScreen';
import LoginScreen from './screens/LogInScreen';
import SignupScreen, { SignupParams } from './screens/SignUpScreen';

export enum AppScreens {
    Home = 'Home',
    AdminPass = 'AdminPass',
    AdminPortal = 'AdminPortal',
    CheckOutLanding = 'CheckOutLanding',
    CheckOut = 'CheckOut',
    CovidError = 'CovidError',
    CovidInformation = 'CovidInformation',
    MaxCap = 'MaxCap',
    Reason = 'Reason',
    Risks = 'Risks',
    SignInLanding = 'SignInLanding',
    SignIn = 'SignIn',
    Login = 'Login',
    Signup = 'Signup',
}

export type AuthStackParamList = {
    Login: undefined;
    Signup: SignupParams;
    Home: undefined;
    AdminPass: undefined;
    AdminPortal: undefined;
    CheckOutLanding: CheckOutParams;
    CheckOut: undefined;
    CovidError: ErrorParams;
    CovidInformation: InfoParams;
    MaxCap: undefined;
    Reason: undefined;
    Risks: RisksParams;
    SignInLanding: SignInParams;
    SignIn: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthFlowNavigator: React.FunctionComponent = () => {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name={AppScreens.Home} component={HomeScreen} />
            <AuthStack.Screen name={AppScreens.AdminPass} component={AdminPasswordScreen} />
            <AuthStack.Screen name={AppScreens.AdminPortal} component={AdminPortalScreen} />
            <AuthStack.Screen name={AppScreens.CheckOutLanding} component={CheckOutLandingScreen} />
            <AuthStack.Screen name={AppScreens.CheckOut} component={CheckOutScreen} />
            <AuthStack.Screen name={AppScreens.CovidError} component={CovidErrorScreen} />
            <AuthStack.Screen name={AppScreens.CovidInformation} component={CovidInformationScreen} />
            <AuthStack.Screen name={AppScreens.MaxCap} component={MaxCapScreen} />
            <AuthStack.Screen name={AppScreens.Reason} component={ReasonsScreen} />
            <AuthStack.Screen name={AppScreens.Risks} component={RisksScreen} />
            <AuthStack.Screen name={AppScreens.SignInLanding} component={SignInLandingScreen} />
            <AuthStack.Screen name={AppScreens.SignIn} component={SignInScreen} />
            <AuthStack.Screen name={AppScreens.Login} component={LoginScreen} />
            <AuthStack.Screen name={AppScreens.Signup} component={SignupScreen} />
        </AuthStack.Navigator>
    );
};
export default AuthFlowNavigator;
