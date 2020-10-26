import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import { styles } from './Styles';

type SingInLandingScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.SignInLanding>;

interface SignInLandingScreenProps {
    navigation: SingInLandingScreenNavigationProps;
}

const SignInLandingScreen: React.FunctionComponent<SignInLandingScreenProps> = (props) => {
    let { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
             <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
            <View style={styles.homeContainer}>
            <View style={styles.landingScreenBoxes}>
                <Text style={styles.landingScreenBoxText}>Welcome to NCTRC!</Text>
                <TouchableOpacity style={styles.smallButton}onPress={() => navigation.popToTop()}>
                <Text style={styles.buttonText}>
                Home
                 </Text>  
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default SignInLandingScreen;
