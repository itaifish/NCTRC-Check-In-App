import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type CheckOutScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckOut>;
interface CheckOutScreenProps {
    navigation: CheckOutScreenNavigationProps;
}
const styles = StyleSheet.create({

});
const CheckOutScreen: React.FunctionComponent<CheckOutScreenProps> = (props) => {
    const { navigation } = props;
return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{width: 400, height: 400}}></Image>
                <Text>CheckOutScreen</Text>
                <Button color='#884633' title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />

            </View>
        </SafeAreaView>
    );
};
export default CheckOutScreen;