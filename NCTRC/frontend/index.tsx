import React from 'react';
import { LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AdminPasswordScreen from './screens/AdminPasswordScreen';
import AdminPortalScreen from './screens/AdminPortalScreen';
import CheckOutLandingScreen from './screens/CheckOutLandingScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import CovidErrorScreen, { ErrorParams } from './screens/COVIDErrorScreen';
import CovidInformationScreen, { InfoParams } from './screens/CovidInformationScreen';
import ReasonsScreen from './screens/ReasonScreen';
import RisksScreen, { RisksParams } from './screens/RisksScreen';
import SignInLandingScreen from './screens/SignInLandingScreen';
import SignInScreen, { VisitorType } from './screens/SignInScreen';
import ChangePinScreen from './screens/ChangePinScreen';
import MaxCapacityScreen from './screens/MaxCapacityScreen';
import ContactTraceScreen from './screens/ContactTraceScreen';
import ContactListScreen, {DateParams} from './screens/ContactListScreen';
import CheckoutOptionsScreen from './screens/CheckoutOptionsScreen';
import CheckedInUsersScreen, {CheckedInParams} from './screens/CheckedInUsersScreen';

LogBox.ignoreLogs([
    'Require cycle:',
    'componentWillReceiveProps has been renamed'
])

export enum AppScreens {
    Home = 'Home',
    AdminPass = 'AdminPass',
    AdminPortal = 'AdminPortal',
    CheckOutLanding = 'CheckOutLanding',
    CheckOut = 'CheckOut',
    CovidError = 'CovidError',
    CovidInformation = 'CovidInformation',
    Reason = 'Reason',
    Risks = 'Risks',
    SignInLanding = 'SignInLanding',
    SignIn = 'SignIn',
    ChangePin = 'ChangePin',
    MaxCapacity = 'MaxCapacity',
    ContactTrace = 'ContactTrace',
    ContactList = 'ContactList',
    CheckoutOptions = 'CheckoutOptions', 
    CheckedInUsers = 'CheckedInUsers'
}

export type AuthStackParamList = {
    Login: undefined;
    Home: undefined;
    AdminPass: undefined;
    AdminPortal: undefined;
    CheckOutLanding: undefined;
    CheckOut: undefined;
    CovidError: ErrorParams;
    CovidInformation: InfoParams;
    Reason: undefined;
    Risks: RisksParams;
    SignInLanding: undefined;
    SignIn: VisitorType;
    MaxCapacity: undefined; 
    ChangePin: undefined; 
    ContactTrace: undefined; 
    ContactList: DateParams,
    CheckoutOptions: undefined,
    CheckedInUsers: CheckedInParams
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
            <AuthStack.Screen name={AppScreens.Reason} component={ReasonsScreen} />
            <AuthStack.Screen name={AppScreens.Risks} component={RisksScreen} />
            <AuthStack.Screen name={AppScreens.SignInLanding} component={SignInLandingScreen} />
            <AuthStack.Screen name={AppScreens.SignIn} component={SignInScreen} />
            <AuthStack.Screen name={AppScreens.ChangePin} component={ChangePinScreen} />
            <AuthStack.Screen name={AppScreens.MaxCapacity} component={MaxCapacityScreen} />
            <AuthStack.Screen name={AppScreens.ContactTrace} component={ContactTraceScreen} />
            <AuthStack.Screen name={AppScreens.ContactList} component={ContactListScreen} />
            <AuthStack.Screen name={AppScreens.CheckoutOptions} component={CheckoutOptionsScreen} />
            <AuthStack.Screen name={AppScreens.CheckedInUsers} component={CheckedInUsersScreen} />
        </AuthStack.Navigator>
    );
};
export default AuthFlowNavigator;
