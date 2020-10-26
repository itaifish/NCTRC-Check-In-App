import React from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import { styles } from './Styles';

type CovidErrorScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CovidError>;
interface CovidErrorScreenProps {
    navigation: CovidErrorScreenNavigationProps;
    route: { params: ErrorParams };
}

export type ErrorParams = {
    reason: string;
};

const CovidErrorScreen: React.FunctionComponent<CovidErrorScreenProps> = (props) => {
    let { navigation, route } = props;
    let { params } = route;
    let { reason } = params;
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
                <Text style={styles.landingScreenBoxText}>Sorry, we are not able to let you in the farm because {reason}</Text>
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
export default CovidErrorScreen;
