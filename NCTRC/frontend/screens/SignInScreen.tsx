import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
type SingInScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.SignIn>;
interface SignInScreenProps {
    navigation: SingInScreenNavigationProps;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    home: {
        fontSize: 30,
    },
    homeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
});

const SignInScreen: React.FunctionComponent<SignInScreenProps> = (props) => {
    const { navigation } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 200, height: 200 }}></Image>
                <TextInput value={firstName} onChangeText={(text) => setFirstName(text)} placeholder="First Name" />
                <TextInput value={lastName} onChangeText={(text) => setLastName(text)} placeholder="Last Name" />
                <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email Address" />
                <Button
                    color="#884633"
                    title="Sign In"
                    onPress={() => {
                            navigation.navigate(AppScreens.CovidInformation, { firstName: firstName, lastName: lastName, email: email });
                    }}
                />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default SignInScreen;
