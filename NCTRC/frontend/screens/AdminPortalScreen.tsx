import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type AdminPortalScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.AdminPortal>;

interface AdminPortalScreenProps {
    navigation: AdminPortalScreenNavigationProps;
}
const styles = StyleSheet.create({});
const AdminPortalScreen: React.FunctionComponent<AdminPortalScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>admin portal screen</Text>
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default AdminPortalScreen;
