import React, { useState, SetStateAction } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Image, TextInput, Picker } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
import { RadioButton } from 'react-native-paper';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { checkUserExists, signinUser } from '../handlers';
import { components } from '../domain/domain';
import { NavigationEvents } from 'react-navigation';
type CovidInformationScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CovidInformation>;
export type InfoParams = {
    firstName: string;
    lastName: string; 
    email: string;
};

interface CovidInformationScreenProps {
    route: { params: InfoParams };
    navigation: CovidInformationScreenNavigationProps;
}

const styles = StyleSheet.create({});

const CovidInformationScreen: React.FunctionComponent<CovidInformationScreenProps> = (props) => {
    let { navigation, route } = props;
    let { params } = route;
    let { firstName, lastName, email } = params;
    let [traveled, setTraveled] = React.useState('');
    let [concerns, setConcerns] = useState('');
    let [symptoms, setSymptoms] = React.useState('');
    let [gatherings, setGatherings] = React.useState('');
    let [covidTest, setCovidTest] = React.useState('');
    let [tempurature, setTempurature] = React.useState(0);
    let yesQuestion = ""; 

    return (
        <ScrollView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 10, height: 10 }}></Image>
                <Text>First Name</Text>
                <TextInput placeholder={firstName} editable={false} />
                <Text>Last Name</Text>
                <TextInput placeholder={lastName} editable={false} />
                <Text>Email</Text>
                <TextInput placeholder={email} editable={false} />
                <Text>
                    Within the past 24 hours have you or anyone in your household experienced any of the following symptoms: fever (over 100.4 F), sore or dry throat, shortness of breath, chest congestion, cough, loss of taste or sense of smell, sneezing, and/or rash?
                </Text>
                <RadioButton.Group onValueChange={value => setSymptoms(value)} value={symptoms}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>Have you traveled out of the country or out of the state within the past 14 days?</Text>
                <RadioButton.Group onValueChange={value => setTraveled(value)} value={traveled}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>Have you attended an event or gathering of more than 25 people at any point in the last 14 days?</Text>
                <RadioButton.Group onValueChange={value => setGatherings(value)} value={gatherings}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>Within the past 14 days, have you received a positive test result for COVID-19 or are you awaiting test results for COVID-19?/Text/</Text>
                <RadioButton.Group onValueChange={value => setCovidTest(value)} value={covidTest}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>What is your tempurature?</Text>
                <TextInput onChangeText={(number) => setTempurature(Number(number))} />
                <Text>Is there anything else you would like to share? Questions, concerns, etc.</Text>
                <TextInput onChangeText={(text) => setConcerns(text)} />
                
                <Button
                    color="#884633"
                    title="Submit"
                    onPress={() => {
        
                        let userToCreate: components["schemas"]["UserRequestModel"] = {
                                firstName: firstName, 
                                lastName: lastName, 
                                email: email
                        }

                        if(traveled == "yes") {
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
                                signinData: { temperature: tempurature, yesQuestion: yesQuestion },
                            };
                            signinUser(exposedUser); 
                            navigation.navigate(AppScreens.CovidError, {
                                reason: yesQuestion,
                            });
                        } else if (tempurature >= 100.4) {
                            const feverUser: components["schemas"]["SigninRequestModel"] = {
                                user: userToCreate,
                                signinData: { temperature: tempurature, yesQuestion: yesQuestion },
                            };
                            signinUser(feverUser); 
                            navigation.navigate(AppScreens.CovidError, {
                                reason: "tempurature",
                            });
                        } else {
                            checkUserExists(userToCreate).then(
                                (res) => {
                                    if(res) {
                                        let returningUser: components["schemas"]["SigninRequestModel"] = {
                                            user: userToCreate,
                                            signinData: { temperature: tempurature },
                                          }
                                          signinUser(returningUser)
                                          navigation.navigate(AppScreens.SignInLanding);
                                    } else {
                                        navigation.navigate(AppScreens.Risks, {firstName:firstName, lastName:lastName, email: email, tempurature:tempurature})
                                    }
                                }
                            )

                       }
                    }
                    }
                />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
            </ScrollView>
    );
};

export default CovidInformationScreen;
