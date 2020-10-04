import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type CovidErrorScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CovidError>;
interface CovidErrorScreenProps {
    navigation: CovidErrorScreenNavigationProps;
}
const styles = StyleSheet.create({});
const CovidErrorScreen: React.FunctionComponent<CovidErrorScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>CovidErrorScreen</Text>
                <Button color="#884633" title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />
            </View>
        </SafeAreaView>
    );
};
export default CovidErrorScreen;
