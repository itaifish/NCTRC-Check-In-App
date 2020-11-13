import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type ChangePinScreenScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.ChangePin>;
import { styles } from './Styles';
interface ChangePinScreenProps {
    navigation: ChangePinScreenScreenNavigationProps;
}

const ChangePinScreen: React.FunctionComponent<ChangePinScreenProps> = (props) => {
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
                 <Text>Change Pin</Text>              
                <View style={styles.homeDiv}></View>

            </View>
       </SafeAreaView>
    );
};
export default ChangePinScreen;