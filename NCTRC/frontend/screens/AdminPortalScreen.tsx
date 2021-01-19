import React from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';
import { DataTable } from 'react-native-paper';

type AdminPortalScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.AdminPortal>;

interface AdminPortalScreenProps {
    navigation: AdminPortalScreenNavigationProps;
}

const AdminPortalScreen: React.FunctionComponent<AdminPortalScreenProps> = (props) => {
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
            <TouchableOpacity style={styles.solidButton}onPress={() => navigation.navigate(AppScreens.ContactTrace)}><Text style={styles.buttonText}>
                Contact Trace
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.solidButton}onPress={() => navigation.navigate(AppScreens.ChangePin)}><Text style={styles.buttonText}>
                Change Pin
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.solidButton}onPress={() => navigation.navigate(AppScreens.MaxCapacity)}><Text style={styles.buttonText}>
                Update Max Capacity
                 </Text>  
                </TouchableOpacity>
            
            </View>
        </SafeAreaView>
    );
};
export default AdminPortalScreen;
