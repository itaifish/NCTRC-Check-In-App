import React, {useState} from 'react';
import { SafeAreaView, Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
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
    //  setMode(currentMode);
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
      
      navigation.navigate(AppScreens.ContactList, {startString: startString, endString: endString})}
      }><Text style={styles.buttonText}>
                Submit
                 </Text>  
                </TouchableOpacity>
            </View>
       </SafeAreaView>
    );
};
export default ContactTraceScreen;