import React from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import { styles } from './Styles';

type ReasonScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Reason>;
interface ReasonScreenProps {
    navigation: ReasonScreenNavigationProps;
}
   
const ReasonScreen: React.FunctionComponent<ReasonScreenProps> = (props) => {
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
                <Text style={styles.question}>What is the reason for your visit?</Text>
                <TouchableOpacity style={styles.reasonButton}onPress={() => navigation.navigate(AppScreens.SignIn)}><Text style={styles.buttonText}>
                Employee
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.reasonButton}onPress={() => navigation.navigate(AppScreens.SignIn)}><Text style={styles.buttonText}>
                Client
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.reasonButton}onPress={() => navigation.navigate(AppScreens.SignIn)}><Text style={styles.buttonText}>
                Volunteer
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.reasonButton}onPress={() => navigation.navigate(AppScreens.SignIn)}><Text style={styles.buttonText}>
                Guest
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.reasonButton}onPress={() => navigation.navigate(AppScreens.SignIn)}><Text style={styles.buttonText}>
                Professional
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.reasonButton}onPress={() => navigation.navigate(AppScreens.SignIn)}><Text style={styles.buttonText}>
                Grason
                 </Text>  
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default ReasonScreen;
