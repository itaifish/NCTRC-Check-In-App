import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type SingInLandingScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.SignInLanding>;

export type SignInParams = {
    name: string;
    email: string;
    time: string;
};

interface SignInLandingScreenProps {
    navigation: SingInLandingScreenNavigationProps;
}

const styles = StyleSheet.create({});
const SignInLandingScreen: React.FunctionComponent<SignInLandingScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>Sign InLandingScreen</Text>
                <Button color="#884633" title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />
            </View>
        </SafeAreaView>
    );
};
export default SignInLandingScreen;
