import React, {useState} from 'react';
import { SafeAreaView, Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { getSignIns } from '../handler/handlers';
import { components } from "../domain/domain";
type ContactTraceScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.ContactTrace>;
import { styles } from './Styles';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ContactTraceScreenProps {
    navigation: ContactTraceScreenNavigationProps;
}

const ContactTraceScreen: React.FunctionComponent<ContactTraceScreenProps> = (props) => {
    let { navigation } = props;
    const [startDate, setStartDate] = useState(new Date());
    const [startString, setStartString] = useState(startDate.toUTCString());
    const [endDate, setEndDate] = useState(new Date());
    const [endString, setEndString] = useState(endDate.toUTCString());
    let [show, setShow] = useState(true);
    show=true; 
    const onChangeStart = (event, selectedDate) => {
      let currentDate = selectedDate || startDate;
      setStartDate(currentDate);
      setStartString(currentDate.toUTCString())
      setShow(Platform.OS === 'ios' ? true : false);
    };
    const onChangeEnd = (event, selectedDate) => {
      let currentDate = selectedDate || endDate;
      setEndDate(currentDate);
      setEndString(currentDate.toUTCString())
      setShow(Platform.OS === 'ios' ? true : false);
    };
  
    let showMode = currentMode => {
      setShow(true);
    };
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
                <View>
                  <Text style={styles.title}>Start Date</Text>
      
      <View>
      <Button onPress={showMode} title="" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={startDate}
          mode='datetime'
          display="default"
          onChange={onChangeStart}
          style={{width: 600}}
        />
      )}
    </View> 
    <Text style={styles.title}>End Date</Text>
  
                <View>
      
      <View>
        <Button onPress={showMode} title="" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={endDate}
          mode='datetime'
          display="default"
          onChange={onChangeEnd}
          style={{width: 600}}
        />
      )}
    </View> 
    <TouchableOpacity style={styles.solidButton}onPress={() => {
      let tableData: string[][] = [];
      getSignIns({startTime: startString, endTime: endString})
      .then(
          (res: components["schemas"]["TimelineListResponse"]) => {
              for(let o of Object.keys(res)) {
                  let rowData: string[] = [];
                 // let x = Number(res[o]['signinTime'])) /  date('Y-m-d h:i:s', $item->timestamp / 1000);
                  const dateObject = new Date(res[o]['signinTime']).toLocaleString()
                  const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
          
                  console.log(humanDateFormat); 
                  rowData.push(res[o]['user']['firstName'] + ' ' + res[o]['user']['lastName']); 
                  rowData.push(res[o]['signinData']['visitorType']); 
                  rowData.push(res[o]['user']['email']); 
                  rowData.push(new Date(res[o]['signinTime']).toLocaleString()); 
                  rowData.push(new Date(res[o]['signoutTime']).toLocaleString()); 
                  rowData.push(res[o]['signinData']['temperature']); 
                  if(res[o]['signinData']["yesQuestion"] == null) {
                    rowData.push("No"); 
                  } else {
                    rowData.push("Yes - " + res[o]['signinData']["yesQuestion"])
                  }
                  tableData.push(rowData);
                  console.log("push")
              }
              navigation.navigate(AppScreens.ContactList, {startString: startString, endString: endString, tableData: tableData})
          }

      )
        .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });

      
      }}><Text style={styles.buttonText}>
                Submit
                 </Text>  
                </TouchableOpacity>
            </View>
       </SafeAreaView>
    );
};
export default ContactTraceScreen;