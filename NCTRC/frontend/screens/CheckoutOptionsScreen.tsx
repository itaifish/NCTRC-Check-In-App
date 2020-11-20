import React from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';
import {getLoggednUsers} from './../handler/handlers'
import { components } from "../domain/domain";


type CheckoutOptionsScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckoutOptions>;

interface CheckoutOptionsScreenProps {
    navigation: CheckoutOptionsScreenNavigationProps;
}

const CheckoutOptionsScreen: React.FunctionComponent<CheckoutOptionsScreenProps> = (props) => {
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
            <TouchableOpacity style={styles.solidButton} onPress={() => {
                let tableData: string[][] = [];
                getLoggednUsers()
                .then(
                    (res: components["schemas"]["UserListResponse"]) => {
                        navigation.navigate(AppScreens.CheckedInUsers, res)
                    }
                )
                  .catch(function(error) {
                  console.log('There has been a problem with your fetch operation: ' + error.message);
                    throw error;
                  });

                }
                }><Text style={styles.buttonText}>
                Select from Checked In Users
                 </Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.solidButton}onPress={() => navigation.navigate(AppScreens.CheckOut)}><Text style={styles.buttonText}>
                Type Name and Email
                 </Text>  
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};
export default CheckoutOptionsScreen;