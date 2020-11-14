import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
type ChangePinScreenScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.ChangePin>;
import { styles } from './Styles';
interface ChangePinScreenProps {
    navigation: ChangePinScreenScreenNavigationProps;
}

const ChangePinScreen: React.FunctionComponent<ChangePinScreenProps> = (props) => {
    let { navigation } = props;
    //call backend to get this 
    let oldPin = '1234';
    let [confirmOldPink, setConfirmOldPin ] = useState(''); 
    let [newPin, setNewPin ] = useState(''); 
    let [confirmNewPin, setConfirmNewPin ] = useState(''); 
    let [dialogueBox, setDialogueBox ] = useState(false); 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
                <View style={styles.homeContainer}>
                <Text>Change Pin</Text>
                <Dialog visible={dialogueBox}>
                <DialogContent>
                    <Text>Pin has been successfully changed!</Text>
                    <TouchableOpacity style={styles.smallButton}onPress={() => setDialogueBox(false)}>
                            <Text style={styles.buttonText}>
                Close
                 </Text>  
                </TouchableOpacity>
                </DialogContent>
                </Dialog>
                <Text style={styles.covidQuestion}>Old Pin</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setConfirmOldPin(text)} placeholder="Old Pin" />
                <Text style={styles.covidQuestion}>New Pin</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setNewPin(text)} placeholder="New Pin" />
                <Text style={styles.covidQuestion}>Confirm Pin</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setConfirmNewPin(text)} placeholder="Confirm New Pin" />
                <TouchableOpacity style={styles.smallButton}onPress={() => {
                    setDialogueBox(true); 
                }}><Text style={styles.buttonText}>
                Set Pin
                 </Text>  
                </TouchableOpacity>
            </View>

            </View>
       </SafeAreaView>
    );
};
export default ChangePinScreen;