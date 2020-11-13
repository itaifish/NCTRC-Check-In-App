import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type ContactTraceScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.ContactTrace>;
import { styles } from './Styles';
import { updateMaxCapacity } from '../handler/handlers';

interface ContactTraceScreenProps {
    navigation: ContactTraceScreenNavigationProps;
}

const ContactTraceScreen: React.FunctionComponent<ContactTraceScreenProps> = (props) => {
    let { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
                <Text>Contact Trace</Text>
            </View>
       </SafeAreaView>
    );
};
export default ContactTraceScreen;