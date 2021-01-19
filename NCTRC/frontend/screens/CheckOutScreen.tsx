import React, { useState } from 'react';
import { SafeAreaView, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { components } from "../domain/domain";
import { signoutUser } from '../handler/handlers';
import { styles } from './Styles';

type CheckOutScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckOut>;
interface CheckOutScreenProps {
    navigation: CheckOutScreenNavigationProps;
}

const CheckOutScreen: React.FunctionComponent<CheckOutScreenProps> = (props) => {
    let { navigation } = props;
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                 <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                 <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
            </TouchableOpacity> 
        <View style={styles.inputContainer}>
            <Text></Text>
                <TextInput  style={styles.textInput} value={firstName} onChangeText={(text) => setFirstName(text)} placeholder="Name" />
                <TextInput  style={styles.textInput} value={lastName} onChangeText={(text) => setLastName(text)} placeholder="Name" />
                <TextInput  style={styles.textInput} value={email} onChangeText={(text) => setEmail(text)} placeholder="Email Address" />
                {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <TouchableOpacity style={styles.smallButton}onPress={() => {
                    if(firstName === '' || lastName === '') {
                        setErrorMessage("Please enter your name.")
                        setError(true);
                    } else if (email.search("@") == -1 || email.search("@") == 0 || email.search(".") == -1) {
                        setErrorMessage("Please enter a valild email.")
                        setError(true);
                    } else {
                        let user: components["schemas"]["UserRequestModel"] = {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                          };
                        signoutUser(user);
                        navigation.navigate(AppScreens.CheckOutLanding);
                    }
                  
                }}><Text style={styles.buttonText}>
                Check Out 
                 </Text>  
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default CheckOutScreen;
