import React, { useState, SetStateAction } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput, Picker } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from './../index';
import { RadioButton } from 'react-native-paper';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { checkUserExists } from '../handlers';
import { components } from '../domain/domain';
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
    const { navigation, route } = props;
    const { params } = route;
    const { firstName, lastName, email } = params;
    const [traveled, setTraveled] = React.useState('');
    const [concerns, setConcerns] = useState('');
    const [contact, setContact] = React.useState('');
    const [gatherings, setGatherings] = React.useState('');
    const [isolate, setIsolate] = React.useState('');
    const [tempurature, setTempurature] = React.useState('');


    return (
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 10, height: 10 }}></Image>
                <Text>First Name</Text>
                <TextInput placeholder={firstName} editable={false} />
                <Text>Last Name</Text>
                <TextInput placeholder={lastName} editable={false} />
                <Text>Email</Text>
                <TextInput placeholder={email} editable={false} />
                <Text>
                    Within the past 14 days, have you had contact with anyone that you know had COVID-19 or COVID-like
                    symptoms?
                </Text>
                <RadioButton.Group onValueChange={value => setContact(value)} value={contact}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>Have you traveled outside the country in the past 30 Days?</Text>
                <RadioButton.Group onValueChange={value => setTraveled(value)} value={traveled}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>Have you attended gatherings with more than 10 people in the last 30 days?</Text>
                <RadioButton.Group onValueChange={value => setGatherings(value)} value={gatherings}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>Have you been told to self-isolate in the past 14 days?</Text>
                <RadioButton.Group onValueChange={value => setIsolate(value)} value={isolate}>
                            <Text>Yes</Text>
                            <RadioButton value="yes"/>
                            <Text>No</Text>
                            <RadioButton value="no" />
                </RadioButton.Group>
                <Text>What is your tempurature?</Text>
                <TextInput onChangeText={(text) => setTempurature(text)} />
                <Text>Is there anything else you would like to share? Questions, concerns, etc.</Text>
                <TextInput onChangeText={(text) => setConcerns(text)} />
                
                <Button
                    color="#884633"
                    title="Submit"
                    onPress={() => {
                        
                        const userToCreate: components["schemas"]["UserRequestModel"] = {
                                firstName: firstName, 
                                lastName: lastName, 
                                email: email
                        }
                        console.log(checkUserExists(userToCreate))

                            navigation.navigate(AppScreens.SignInLanding, {
                                firstName: firstName,
                                lastName: lastName, 
                                email: email,
                                traveled: traveled,
                                contact: contact,
                                concerns: concerns,
                                gatherings: gatherings,
                                isolate: isolate,
                                tempurature: tempurature, 
                            });
                       }
                    }
                />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
    );
};

export default CovidInformationScreen;
