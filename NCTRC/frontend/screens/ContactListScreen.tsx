import React, {useState} from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';
import { getSignIns } from '../handler/handlers';

type ContactListScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.ContactList>;
interface ContactListScreenProps {
    navigation: ContactListScreenNavigationProps;
    route: { params: DateParams };
}

export type DateParams = {
    startString: string;
    endString: string;
}

const ContactListScreen: React.FunctionComponent<ContactListScreenProps> = (props) => {
    let { navigation, route } = props;
    let { params } = route;
    let { startString, endString } = params;
    getSignIns({startTime: startString, endTime: endString}).then(
      ).catch(

      )
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
                <Text>{startString}</Text>
                <View>
            </View>
        </SafeAreaView>
    );
};
export default ContactListScreen;