import React, { useState } from 'react';
import { ScrollView, Text, View, Button, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { RadioButton } from 'react-native-paper';
import { checkUserExists, signinUser } from '../handler/handlers';
import { components } from '../domain/domain';
import { styles } from './Styles';

const feverTemperature = 100.4; 

type CovidInformationScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CovidInformation>;
export type InfoParams = {
    firstName: string;
    lastName: string; 
    email: string;
    type: string; 
};

interface CovidInformationScreenProps {
    route: { params: InfoParams };
    navigation: CovidInformationScreenNavigationProps;
}


const CovidInformationScreen: React.FunctionComponent<CovidInformationScreenProps> = (props) => {
    let { navigation, route } = props;
    let { params } = route;
    let { firstName, lastName, email, type } = params;
    let [traveled, setTraveled] = React.useState('');
    let [concerns, setConcerns] = useState('');
    let [symptoms, setSymptoms] = React.useState('');
    let [gatherings, setGatherings] = React.useState('');
    let [covidTest, setCovidTest] = React.useState('');
    let [temperature, setTemperature] = React.useState(0);
    let [signature, setSignature] = React.useState('');
    let yesQuestion = ""; 
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    const questions: [string, (value: string) => void, string][] = [
        ["Within the past 24 hours have you or anyone in your household experienced any of the following symptoms: fever (over 100.4 F), sore or dry throat, shortness of breath, chest congestion, cough, loss of taste or sense of smell, sneezing, and/or rash?", (value: string) => {setSymptoms(value)}, symptoms],
        ["Have you traveled out of the country or out of the state within the past 14 days?",  (value: string) => {setTraveled(value)}, traveled],
        ["Have you attended an event or gathering of more than 25 people at any point in the last 14 days?", (value: string) => {setGatherings(value)}, gatherings],
        ["Within the past 14 days, have you received a positive test result for COVID-19 or are you awaiting test results for COVID-19?", (value: string) => {setCovidTest(value)}, covidTest],

    ];
    
    const questionsJSX: JSX.Element[] = [];
    questions.forEach((question, index) => {
        questionsJSX.push(
            <View key={index}>
                <Text style={styles.covidQuestion}>{question[0]}</Text>
                <RadioButton.Group onValueChange={question[1]} value={question[2]}>
                    <View style={styles.radioContainer}>
                            <Text style={styles.radioText}>Yes</Text>
                            <RadioButton.Android color="#884633" value="yes"/>
                            <Text style={styles.radioText}>No</Text>
                            <RadioButton.Android color="#884633" value="no" />
                    </View>
                </RadioButton.Group>
            </View>
        );
    });

    return (
        <ScrollView style={styles.scrollContainer}>
                            <KeyboardAvoidingView behavior={"padding"}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                 <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                 <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
            </TouchableOpacity> 
        <View>
                <Text style={styles.covidQuestion}>First Name</Text>
                <TextInput style={styles.textInput} placeholder={firstName} editable={false} />
                <Text style={styles.covidQuestion}>Last Name</Text>
                <TextInput style={styles.textInput} placeholder={lastName} editable={false} />
                <Text style={styles.covidQuestion}>Email</Text>
                <TextInput style={styles.textInput} placeholder={email} editable={false} />
                {questionsJSX}
                <Text style={styles.covidQuestion}>What is your temperature?</Text>
                <TextInput style={styles.textInput} onChangeText={(number) => setTemperature(Number(number))} />
                <Text style={styles.covidQuestion}>Is there anything else you would like to share? Questions, concerns, etc.</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => setConcerns(text)} />
                {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <TouchableOpacity style={styles.smallButton}
                    onPress={() => {

                
                        if(temperature < 85 || temperature > 103) {
                            setErrorMessage("Please enter a valid temperature")
                            setError(true);
                        } else if (traveled === '' || symptoms === '' || gatherings === '' || covidTest === '') {
                                setErrorMessage("Please answer all the questions")
                                setError(true);
                        } else {
                                
        
                        let userToCreate: components["schemas"]["UserRequestModel"] = {
                                firstName: firstName, 
                                lastName: lastName, 
                                email: email
                        }

                        if(traveled == "yes" && type != "Workshop/Event") {
                            yesQuestion = "Traveled in the past 14 days";
                        } else if(symptoms == "yes") {
                            yesQuestion = "Experienced or exposed to symptoms in the past 24 hours";
                        } else if(covidTest == "yes") {
                            yesQuestion = "Positive test or waiting for results";
                        } else if(gatherings == "yes") {
                            yesQuestion = "Attending events or gatherings";
                        }
                        
                        if(yesQuestion != "") {
                            console.log(yesQuestion);
                            const exposedUser: components["schemas"]["SigninRequestModel"] = {
                                user: userToCreate,
                                signinData: { temperature: temperature, yesQuestion: yesQuestion, visitorType: type },
                            };
                            signinUser(exposedUser); 
                            navigation.navigate(AppScreens.CovidError, {
                                reason: yesQuestion,
                            });
                        } else if (temperature >= feverTemperature) {
                            const feverUser: components["schemas"]["SigninRequestModel"] = {
                                user: userToCreate,
                                signinData: { temperature: temperature, yesQuestion: "temperature", visitorType: type },
                            };
                            signinUser(feverUser); 
                            navigation.navigate(AppScreens.CovidError, {
                                reason: "your temperature is too high.",
                            });
                        } else {
                            checkUserExists(userToCreate).then(
                                (res) => {
                                    if(res) {
                                        let returningUser: components["schemas"]["SigninRequestModel"] = {
                                            user: userToCreate,
                                            signinData: { temperature: temperature, visitorType: type },
                                          }
                                          signinUser(returningUser).then(
                                              (response) => {
                                                  console.log(response); 
                                                  if(response ==200 || response == 201) {
                                                    navigation.navigate(AppScreens.SignInLanding);
                                                  } else if (response == 409) {
                                                    navigation.navigate(AppScreens.CovidError, {reason: "the center is currently at maximum capacity."});                   
                                                  } else {
                                                    navigation.navigate(AppScreens.CovidError, {reason: response.toString()});
                                                  }
                                              }
                                          )
                                          
                                    } else {
                                        navigation.navigate(AppScreens.Risks, {firstName:firstName, lastName:lastName, email: email, tempurature:temperature, visitorType: type})
                                    }
                                }
                            )

                       }
                    }}}>
                    <Text style={styles.buttonText}>
                    Submit
                     </Text>  
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>

            </ScrollView>
    );
};

export default CovidInformationScreen;
