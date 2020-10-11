import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type CheckOutScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckOut>;
interface CheckOutScreenProps {
    navigation: CheckOutScreenNavigationProps;
}
const styles = StyleSheet.create({});
var userCheckedIn = true;

const CheckOutScreen: React.FunctionComponent<CheckOutScreenProps> = (props) => {
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
                    title="Check Out"
                    onPress={() => {
                        if (userCheckedIn) {
                            navigation.navigate(AppScreens.CheckOutLanding, { name: name, email: email });
                        } else {
                            //error message that user is not checkin
                        }
                    }}
                />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default CheckOutScreen;
