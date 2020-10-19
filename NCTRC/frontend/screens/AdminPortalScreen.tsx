import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import { DataTable } from 'react-native-paper';
type AdminPortalScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.AdminPortal>;

interface AdminPortalScreenProps {
    navigation: AdminPortalScreenNavigationProps;
}
const styles = StyleSheet.create({});
const AdminPortalScreen: React.FunctionComponent<AdminPortalScreenProps> = (props) => {
    const { navigation } = props;
    const grid = [
        [
            { value: 1, hint: 'Valid' },
            { value: 3, hint: 'Not valid' },
        ],
        [{ value: 2 }, { value: 4 }],
    ];
    return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 100, height: 100 }}></Image>
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
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </SafeAreaView>
    );
};
export default AdminPortalScreen;
