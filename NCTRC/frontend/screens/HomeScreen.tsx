import React, {useState} from 'react';
import { SafeAreaView, Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, DatePickerIOSComponent, DatePickerIOSBase } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type HomeScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Home>;
import { styles } from './Styles';

interface HomeScreenProps {
    navigation: HomeScreenNavigationProps;
}




const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
    let { navigation } = props;
      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 300, height: 300 }}></Image>
                <TouchableOpacity style={styles.solidButton}onPress={() => navigation.navigate(AppScreens.Reason)}><Text style={styles.buttonText}>
                Check In
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.solidButton}onPress={() => navigation.navigate(AppScreens.CheckOut)}><Text style={styles.buttonText}>
                Check Out
                 </Text>  
                </TouchableOpacity>
                <View style={styles.homeDiv}></View>
                <Button color='#884633'title="Sign in as Admin"onPress={() => navigation.navigate(AppScreens.AdminPass)} />

            </View>
       </SafeAreaView>
    );
};
export default HomeScreen;
