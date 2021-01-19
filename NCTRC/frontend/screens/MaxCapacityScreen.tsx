import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
type MaxCapacityScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.MaxCapacity>;
import { styles } from './Styles';
import { updateMaxCapacity } from '../handler/handlers';

interface MaxCapacityScreenProps {
    navigation: MaxCapacityScreenNavigationProps;
}

const MaxCapacityScreen: React.FunctionComponent<MaxCapacityScreenProps> = (props) => {
    let { navigation } = props;
    let [maxCapacity, setMaxCapacity ] = useState(0); 
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
                <Text>Max Capacity</Text>
                <Dialog visible={dialogueBox}>
                <DialogContent>
                    <Text>Max capacity has been updated to {maxCapacity}!</Text>
                    <TouchableOpacity style={styles.smallButton}onPress={() => setDialogueBox(false)}>
                            <Text style={styles.buttonText}>
                Close
                 </Text>  
                </TouchableOpacity>
                </DialogContent>
                </Dialog>
                <Dialog visible={errorBox}>
                <DialogContent>
                    <Text>An error occured when trying to change the max capacity. Please update it in the database directly or try again later.</Text>
                    <TouchableOpacity style={styles.smallButton}onPress={() => setErrorBox(false)}>
                            <Text style={styles.buttonText}>
                Close
                 </Text>  
                </TouchableOpacity>
                </DialogContent>
                </Dialog>
                <TextInput style={styles.textInput} onChangeText={(text) => setMaxCapacity(Number(text))} placeholder="" />
                <TouchableOpacity style={styles.smallButton}onPress={() => {
                    updateMaxCapacity({maxCapacity: maxCapacity}).then(
                        (res) => {
                            if(res==200) {
                                setDialogueBox(true); 
                            } else {
                                setErrorBox(true); 
                            }
                        }
                    )
                    
                }}><Text style={styles.buttonText}>
                Set New Max
                 </Text>  
                </TouchableOpacity>
            </View>

            </View>
       </SafeAreaView>
    );
};
export default MaxCapacityScreen;

