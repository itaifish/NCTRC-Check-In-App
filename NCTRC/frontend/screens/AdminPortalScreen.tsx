import React from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';
import { DataTable } from 'react-native-paper';

type AdminPortalScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.AdminPortal>;

interface AdminPortalScreenProps {
    navigation: AdminPortalScreenNavigationProps;
}

const AdminPortalScreen: React.FunctionComponent<AdminPortalScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
            <View style={styles.homeContainer}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title>Check In</DataTable.Title>
                        <DataTable.Title>Check Out</DataTable.Title>
                        <DataTable.Title>Risk Form</DataTable.Title>
                        <DataTable.Title>Questions/Concerns</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>Sarah Bost</DataTable.Cell>
                        <DataTable.Cell>sbost@unc.edu</DataTable.Cell>
                        <DataTable.Cell>10/12/2020 8:50 AM</DataTable.Cell>
                        <DataTable.Cell>10/12/2020 10:15 AM</DataTable.Cell>
                        <DataTable.Cell>Signed Risk Form</DataTable.Cell>
                        <DataTable.Cell>No concerns!</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Daniel Evora</DataTable.Cell>
                        <DataTable.Cell>daniel@unc.edu</DataTable.Cell>
                        <DataTable.Cell>10/12/2020 10:30 AM</DataTable.Cell>
                        <DataTable.Cell>10/12/2020 11:45 AM</DataTable.Cell>
                        <DataTable.Cell>Signed Risk Form</DataTable.Cell>
                        <DataTable.Cell>Want to be notified of any covid case</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Itai Rivkin-Fish</DataTable.Cell>
                        <DataTable.Cell>itai@unc.edu</DataTable.Cell>
                        <DataTable.Cell>10/12/2020 10:30 AM</DataTable.Cell>
                        <DataTable.Cell>10/12/2020 5:00 PM</DataTable.Cell>
                        <DataTable.Cell>Signed Risk Form</DataTable.Cell>
                        <DataTable.Cell>No concerns</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
        </SafeAreaView>
    );
};
export default AdminPortalScreen;
