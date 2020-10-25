import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
type SingInLandingScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.SignInLanding>;

export type SignInParams = {
    firstName: string;
    lastName: string; 
    email: string;
    traveled: string;
    contact: string;
    concerns: string;
    gatherings: string;
    isolate: string;
    tempurature: string; 
};

interface SignInLandingScreenProps {
    navigation: SingInLandingScreenNavigationProps;
    route: { params: SignInParams };
}

const styles = StyleSheet.create({});
const SignInLandingScreen: React.FunctionComponent<SignInLandingScreenProps> = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { firstName, lastName, email, traveled, contact, concerns, gatherings, isolate } = params;
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>Enjoy your visit!</Text>
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default SignInLandingScreen;
