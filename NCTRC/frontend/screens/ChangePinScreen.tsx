import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
type ChangePinScreenScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.ChangePin>;
import { styles } from './Styles';
import { validatePin, changePin } from './../handler/handlers'
interface ChangePinScreenProps {
    navigation: ChangePinScreenScreenNavigationProps;
}

const ChangePinScreen: React.FunctionComponent<ChangePinScreenProps> = (props) => {
    let { navigation } = props;
    //call backend to get this 
    let [confirmOldPink, setConfirmOldPin ] = useState(''); 
    let [newPin, setNewPin ] = useState(''); 
    let [confirmNewPin, setConfirmNewPin ] = useState(''); 
    let [dialogueBox, setDialogueBox ] = useState(false); 
    let [errorBox, setErrorBox ] = useState(false); 

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
                <Dialog visible={errorBox}>
                <DialogContent>
                    <Text>An error occured when changing the pin. Please try again. Ensure you have entered the correct old pin, the new pin is 4 characters, and the new pin and the confirmed pin are the same.</Text>
                    <TouchableOpacity style={styles.smallButton}onPress={() => setErrorBox(false)}>
                            <Text style={styles.buttonText}>
                    Close
                 </Text>  
                </TouchableOpacity>
                </DialogContent>
                </Dialog>
                <Text style={styles.covidQuestion}>Old Pin</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setConfirmOldPin(text)} placeholder="Old Pin" />
                <Text style={styles.covidQuestion}>New 4 Character Pin</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setNewPin(text)} placeholder="New Pin" />
                <Text style={styles.covidQuestion}>Confirm New Pin</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setConfirmNewPin(text)} placeholder="Confirm New Pin" />
                <TouchableOpacity style={styles.smallButton}onPress={() => {
                    validatePin({pin: confirmOldPink}).then(
                        (res) => {
                            console.log(res)
                            if(res!=200) {
                                 setErrorBox(true); 
                                 return; 
                            }
                        }
                    )
                    if(newPin != confirmNewPin) {
                        setErrorBox(true); 
                        return; 
                    } else if (newPin.length != 4) {
                        setErrorBox(true); 
                        return;
                    } else {
                        changePin({pin: newPin}).then(
                            (res) => {
                                console.log(res)
                                if(res!=200) {
                                     setErrorBox(true); 
                                     return; 
                                } else {
                                    setDialogueBox(true); 
                                    return; 
                                }
                            }
                        )
                        
                    }
                   
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