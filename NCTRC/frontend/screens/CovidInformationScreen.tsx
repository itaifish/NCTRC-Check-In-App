import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type CovidInformationScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CovidInformation>;
export type InfoParams = {
    name: string;
    email: string; 
};

interface CovidInformationScreenProps {
    navigation: CovidInformationScreenNavigationProps;
}
const styles = StyleSheet.create({

});
const CovidInformationScreen: React.FunctionComponent<CovidInformationScreenProps> = (props) => {
    const { navigation } = props;
return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{width: 400, height: 400}}></Image>
                <Text>CovidInformation</Text>
                <Button color='#884633' title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />
            </View>
        </SafeAreaView>
    );
};
export default CovidInformationScreen;