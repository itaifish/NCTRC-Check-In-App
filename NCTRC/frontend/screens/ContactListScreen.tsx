import React, {useState, Component} from 'react';
import { ScrollView, SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';
import { Table, Row } from 'react-native-table-component';

type ContactListScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.ContactList>;
interface ContactListScreenProps {
    navigation: ContactListScreenNavigationProps;
    route: { params: DateParams };
}

export type DateParams = {
    startString: string;
    endString: string;
    tableData: string[][]; 
}

const ContactListScreen: React.FunctionComponent<ContactListScreenProps> = (props) => {
    let { navigation, route } = props;
    let { params } = route;
    let { startString, endString, tableData } = params;
    let tableHead =  ['Name', 'Visitor Type', 'Email', 'Sign In', 'Check Out', 'Temperature', 'Denied entry?'];
    let widthArr = [200, 200, 200, 200, 200, 200, 200];
    console.log("renderr")
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
                <View style={styles.tableContainer}>
                <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {tableData.map((rowData, index) => (
                            <Row
                            key={index}
                            data={rowData}
                            widthArr={widthArr}
                            style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                            textStyle={styles.text}
                            />
                    ))
                    }
                    </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

        </SafeAreaView>
    );
};
export default ContactListScreen;