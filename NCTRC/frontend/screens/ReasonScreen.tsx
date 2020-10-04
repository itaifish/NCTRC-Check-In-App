import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type ReasonScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Reason>;
interface ReasonScreenProps {
    navigation: ReasonScreenNavigationProps;
}
const styles = StyleSheet.create({

});
const ReasonScreen: React.FunctionComponent<ReasonScreenProps> = (props) => {
    const { navigation } = props;
return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{width: 400, height: 400}}></Image>
                <Text>reason screen</Text>
                <Button color='#884633' title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />

            </View>
        </SafeAreaView>
    );
};
export default ReasonScreen;