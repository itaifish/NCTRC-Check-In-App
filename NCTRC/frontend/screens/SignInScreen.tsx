import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type SingInScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.SignIn>;
interface SignInScreenProps {
    navigation: SingInScreenNavigationProps;
}
const styles = StyleSheet.create({});

const SignInScreen: React.FunctionComponent<SignInScreenProps> = (props) => {
    const { navigation } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 200, height: 200 }}></Image>
                <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Name" />
                <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email Address" />
                <Button
                    color="#884633"
                    title="Sign In"
                    onPress={() => {
                        if (name != '' && email != '') {
                            navigation.navigate(AppScreens.Risks, { name: name, email: email });
                        }
                    }}
                />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default SignInScreen;
