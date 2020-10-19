import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
type CheckOutLandingScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckOutLanding>;
export type CheckOutParams = {
    name: string;
    email: string;
};
interface CheckOutLandingScreenProps {
    navigation: CheckOutLandingScreenNavigationProps;
    route: { params: CheckOutParams };
}
const styles = StyleSheet.create({});
const CheckOutLandingScreen: React.FunctionComponent<CheckOutLandingScreenProps> = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { name, email } = params;

    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>Thanks for visiting!</Text>
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default CheckOutLandingScreen;
