import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
type CovidErrorScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CovidError>;
interface CovidErrorScreenProps {
    navigation: CovidErrorScreenNavigationProps;
    route: { params: ErrorParams };
}

export type ErrorParams = {
    reason: string;
};

const styles = StyleSheet.create({});
const CovidErrorScreen: React.FunctionComponent<CovidErrorScreenProps> = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { reason } = params;
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>Sorry, we are not able to let you in the farm because {reason}</Text>
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default CovidErrorScreen;
