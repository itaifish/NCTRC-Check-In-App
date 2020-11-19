import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';

type SingInScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.SignIn>;
interface SignInScreenProps {
    navigation: SingInScreenNavigationProps;
    route: { params: VisitorType };
}

export type VisitorType = {
    type: string;
};

const SignInScreen: React.FunctionComponent<SignInScreenProps> = (props) => {
   let { navigation, route } = props;
   let { params } = route;
   let { type } = params;
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
                <KeyboardAvoidingView>
                <TextInput  style={styles.textInput} value={firstName} onChangeText={(text) => setFirstName(text)} placeholder="First Name" />
                <TextInput style={styles.textInput} value={lastName} onChangeText={(text) => setLastName(text)} placeholder="Last Name" />
                <TextInput style={styles.textInput} value={email} onChangeText={(text) => setEmail(text)} placeholder="Email Address" />
                {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <TouchableOpacity style={styles.smallButton}onPress={() => {
                    if(firstName === '' || lastName === '') {
                        setErrorMessage("Please enter your name.")
                        setError(true);
                    } else if (email.search("@") == -1 || email.search("@") == 0 || email.search(".") == -1) {
                        setErrorMessage("Please enter a valild email.")
                        setError(true);
                    } else {
                        navigation.navigate(AppScreens.CovidInformation, { firstName: firstName, lastName: lastName, email: email, type: type })
                    }
                   }}>
                <Text style={styles.buttonText}>
                Sign In
                 </Text>  
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};
export default SignInScreen;
