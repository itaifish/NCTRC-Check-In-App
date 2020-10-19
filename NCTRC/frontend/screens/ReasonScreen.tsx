import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
type ReasonScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Reason>;
interface ReasonScreenProps {
    navigation: ReasonScreenNavigationProps;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    home: {
        fontSize: 30,
    },
    homeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
});
const ReasonScreen: React.FunctionComponent<ReasonScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 200, height: 200 }}></Image>
                <Text>What is the reason for your visit?</Text>
                <Button color="#884633" title="Employee" onPress={() => navigation.navigate(AppScreens.SignIn)} />
                <Button color="#884633" title="Client" onPress={() => navigation.navigate(AppScreens.SignIn)} />
                <Button color="#884633" title="Volunteer" onPress={() => navigation.navigate(AppScreens.SignIn)} />
                <Button color="#884633" title="Guest" onPress={() => navigation.navigate(AppScreens.SignIn)} />
                <Button color="#884633" title="Professional" onPress={() => navigation.navigate(AppScreens.SignIn)} />
                <Button color="#884633" title="Grason" onPress={() => navigation.navigate(AppScreens.SignIn)} />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default ReasonScreen;
