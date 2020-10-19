import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import AdminPortalScreen from './AdminPortalScreen';
import { useNavigation } from '@react-navigation/native';
type AdminPasswordScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.AdminPass>;
interface AdminPasswordScreenProps {
    navigation: AdminPasswordScreenNavigationProps;
}
const styles = StyleSheet.create({});
const AdminPassScreen: React.FunctionComponent<AdminPasswordScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 400, height: 400 }}></Image>
                <Text>Enter admin password</Text>
                <TextInput />
                <Button color="#884633" title="Enter" onPress={() => navigation.navigate(AppScreens.AdminPortal)} />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default AdminPassScreen;
