import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';
import CodePin from 'react-native-pin-code';


type AdminPasswordScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.AdminPass>;
interface AdminPasswordScreenProps {
    navigation: AdminPasswordScreenNavigationProps;
}
const AdminPassScreen: React.FunctionComponent<AdminPasswordScreenProps> = (props) => {
    const { navigation } = props;

    //temporarily 1234, need to call from handler 
    var adminCode = '1234'; 

    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                 <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                 <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
            </TouchableOpacity> 


        <View style={styles.homeContainer}>
                <CodePin code={adminCode} 
                success={() => navigation.navigate(AppScreens.AdminPortal)} 
                text="Enter Admin Password" 
                error="Incorrect Password" 
                obfuscation={true}
                autoFocusFirst={true}
                containerStyle={{marginTop: -300}}
                errorStyle={{ color: '#884633', marginBottom: 30}}
                textStyle={{ textAlign: 'center', color: '#884633', fontSize: 20, marginBottom: 30 }}
                pinStyle={{'height': 60 }}
                />
            </View>
            
            </SafeAreaView>
    );
};
export default AdminPassScreen;
