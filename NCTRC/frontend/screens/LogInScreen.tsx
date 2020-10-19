import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { AppScreens, AuthStackParamList } from '../Index';
import { StackNavigationProp } from '@react-navigation/stack';
type LoginScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Login>;
interface LoginScreenProps {
    navigation: LoginScreenNavigationProps;
}
const styles = StyleSheet.create({
    btnSignupContainer: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 4,
        padding: 2,
        width: '100%',
    },
    textInputContainer: {
        width: '100%',
    },
    txtHello: {
        fontSize: 30,
    },
});
const LoginScreen: React.FunctionComponent<LoginScreenProps> = (props) => {
    const { navigation } = props;
    const [username, setUsername] = useState<string>('');
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.txtHello}>Hello</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={username}
                    placeholder="username"
                    style={styles.textInput}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput placeholder="password" secureTextEntry={true} style={styles.textInput} />
            </View>
            <View style={styles.btnSignupContainer}>
                <Text>Or</Text>
                <Button title="Signup" onPress={() => navigation.navigate(AppScreens.Signup, { username })} />
            </View>
            <Button title="Back" onPress={() => navigation.navigate(AppScreens.Home)} />
        </SafeAreaView>
    );
};
export default LoginScreen;
