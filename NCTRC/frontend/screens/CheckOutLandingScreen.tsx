import React from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import { styles } from './Styles';

type CheckOutLandingScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckOutLanding>;

interface CheckOutLandingScreenProps {
    navigation: CheckOutLandingScreenNavigationProps;
}

const CheckOutLandingScreen: React.FunctionComponent<CheckOutLandingScreenProps> = (props) => {
    const { navigation} = props;

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
                <Text style={styles.landingScreenBoxText}>Thanks for visiting!</Text>
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
export default CheckOutLandingScreen;
