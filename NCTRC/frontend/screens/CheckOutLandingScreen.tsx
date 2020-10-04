import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type CheckOutLandingScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckOutLanding>;
export type CheckOutParams = {
    name: string;
    email: string; 
    time: string; 
};
interface CheckOutLandingScreenProps {
    navigation: CheckOutLandingScreenNavigationProps;
}
const styles = StyleSheet.create({

});
const CheckOutLandingScreen: React.FunctionComponent<CheckOutLandingScreenProps> = (props) => {
    const { navigation } = props;
return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{width: 400, height: 400}}></Image>
                <Text>CheckOutLandingScreen</Text>
                <Button color='#884633' title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />

            </View>
        </SafeAreaView>
    );
};
export default CheckOutLandingScreen;