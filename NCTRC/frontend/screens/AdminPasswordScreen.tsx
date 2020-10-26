import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import { styles } from './Styles';

type AdminPasswordScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.AdminPass>;
interface AdminPasswordScreenProps {
    navigation: AdminPasswordScreenNavigationProps;
}
const AdminPassScreen: React.FunctionComponent<AdminPasswordScreenProps> = (props) => {
    const { navigation } = props;
  
    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                 <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                 <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
            </TouchableOpacity> 
        <View style={styles.homeContainer}>
                <Text>Enter admin password</Text>
                <Button color="#884633" title="Enter" onPress={() => navigation.navigate(AppScreens.AdminPortal)} />
            </View>
            </SafeAreaView>
    );
};
export default AdminPassScreen;
