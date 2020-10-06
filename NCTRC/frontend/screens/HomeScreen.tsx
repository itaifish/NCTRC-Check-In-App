import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type HomeScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.Home>;
interface HomeScreenProps {
    navigation: HomeScreenNavigationProps;
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
const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
<<<<<<< HEAD
                <Image source={require('./../assets/NCTRClogo.png')} style={{width: 400, height: 400}}></Image>
                <Button color='#884633' title="Check In" onPress={() => navigation.navigate(AppScreens.Reason)} />
                <Button color='#884633' title="Check Out" onPress={() => navigation.navigate(AppScreens.CovidError)} />
                <Button color='#884633' title="Admin" onPress={() => navigation.navigate(AppScreens.AdminPass)} />
                <Button color='#884633' title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />
=======
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Button color="#884633" title="Check In" onPress={() => navigation.navigate(AppScreens.Login)} />
                <Button color="#884633" title="Check Out" onPress={() => navigation.navigate(AppScreens.CovidError)} />
                <Button color="#884633" title="Admin" onPress={() => navigation.navigate(AppScreens.AdminPass)} />
                <Button color="#884633" title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />
>>>>>>> 1509b0b4fe258ef4794c650b616003b9e42a13d5
            </View>
        </SafeAreaView>
    );
};
export default HomeScreen;
