import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { AppScreens, AuthStackParamList } from '../Index';
import { StackNavigationProp } from '@react-navigation/stack';
type SignupScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Signup>;
export type SignupParams = {
    username: string;
};
interface SignupScreenProps {
    route: { params: SignupParams };
    navigation: SignupScreenNavigationProps;
}
const styles = StyleSheet.create({
    btnLoginContainer: {
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    txtSignupScreen: {
        fontSize: 30,
    },
    txtSignupScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtUsername: {
        fontSize: 25,
        color: 'grey',
    },
});
const SignupScreen: React.FunctionComponent<SignupScreenProps> = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { username } = params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.txtSignupScreenContainer}>
                <Text style={styles.txtSignupScreen}>SignupScreen</Text>
                <Text style={styles.txtUsername}>{username}</Text>
            </View>
            <View style={styles.btnLoginContainer}>
                <Text>have an account?</Text>
                <Button title="Login" onPress={() => navigation.pop()} />
            </View>
        </SafeAreaView>
    );
};
export default SignupScreen;
