import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type RisksScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Risks>;

interface RisksScreenProps {
    route: { params: RisksParams };
    navigation: RisksScreenNavigationProps;
}
export type RisksParams = {
    name: string;
    email: string;
};

const styles = StyleSheet.create({});
const RisksScreen: React.FunctionComponent<RisksScreenProps> = (props) => {
    const { navigation } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>Do you agree to the risks?</Text>
                <Text>NCTRC COVID Risk Document</Text>
                <Button
                    color="#884633"
                    title="Submit"
                    onPress={() => navigation.navigate(AppScreens.CovidInformation, { name: name, email: email })}
                />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default RisksScreen;
