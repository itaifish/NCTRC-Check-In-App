import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type SingInScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.SignIn>;
interface SignInScreenProps {
    navigation: SingInScreenNavigationProps;
}
const styles = StyleSheet.create({

});
const SignInScreen: React.FunctionComponent<SignInScreenProps> = (props) => {
    const { navigation } = props;
return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{width: 400, height: 400}}></Image>
                <Text>SignInScreen</Text>
                <Button color='#884633' title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />

            </View>
        </SafeAreaView>
    );
};
export default SignInScreen;