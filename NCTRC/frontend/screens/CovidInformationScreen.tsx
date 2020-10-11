import React, { useState, SetStateAction } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput, Picker } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { ScrollView } from 'react-native-gesture-handler';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
type CovidInformationScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CovidInformation>;
export type InfoParams = {
    name: string;
    email: string;
};

interface CovidInformationScreenProps {
    route: { params: InfoParams };
    navigation: CovidInformationScreenNavigationProps;
}

const styles = StyleSheet.create({});
const maxCap = 10;
var currentCap = 8;

const CovidInformationScreen: React.FunctionComponent<CovidInformationScreenProps> = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { name, email } = params;
    var [traveled, setTraveled] = React.useState(false);
    var [concerns, setConcerns] = useState('');
    var [contact, setContact] = React.useState(false);
    var [gatherings, setGatherings] = React.useState(false);
    var [isolate, setIsolate] = React.useState(false);
    var [travelLabel, setravelLabel] = useState('');
    var [contactLabel, setContactLabel] = useState('');
    var [gatheringsLabel, setGatheringsLabel] = useState('');
    var [isolateLabel, setIsolateLabel] = useState('');

    return (
        <ScrollView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 10, height: 10 }}></Image>
                <Text>Name</Text>
                <TextInput placeholder={name} editable={false} />
                <Text>Email</Text>
                <TextInput placeholder={email} editable={false} />
                <Text>
                    Within the past 14 days, have you had contact with anyone that you know had COVID-19 or COVID-like
                    symptoms?
                </Text>
                <Picker
                    selectedValue={contactLabel}
                    onValueChange={(itemValue, itemLabel) => {
                        setContact(itemValue);
                        if (itemValue) {
                            setContactLabel('Yes');
                            console.log('yes');
                        } else {
                            setContactLabel('No');
                        }
                    }}
                >
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>Have you traveled outside the country in the past 30 Days?</Text>
                <Picker selectedValue={''} onValueChange={(itemValue) => setTraveled(itemValue)}>
                    <Picker.Item value="" label="" />
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>Have you attended gatherings with more than 10 people in the last 30 days?</Text>
                <Picker onValueChange={(itemValue) => setGatherings(itemValue)}>
                    <Picker.Item value="" label="" />
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>Have you been told to self-isolate in the past 14 days?</Text>
                <Picker onValueChange={(itemValue) => setIsolate(itemValue)}>
                    <Picker.Item value="" label="" />
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>Is there anything else you would like to share? Questions, concerns, etc.</Text>
                <TextInput onChangeText={(text) => setConcerns(text)} />
                <Button
                    color="#884633"
                    title="Submit"
                    onPress={() => {
                        if (currentCap + 1 > maxCap) {
                            navigation.navigate(AppScreens.MaxCap);
                        } else if (traveled) {
                            setIsolate(false);
                            setGatherings(false);
                            setTraveled(false);
                            setContact(false);
                            navigation.navigate(AppScreens.CovidError, {
                                name: name,
                                email: email,
                                reason: 'Traveled in the last 30 days',
                                concerns: concerns,
                            });
                        } else if (contact) {
                            navigation.navigate(AppScreens.CovidError, {
                                name: name,
                                email: email,
                                reason: 'Contact with person who tested positive for COVID-19',
                                concerns: concerns,
                            });
                        } else if (gatherings) {
                            navigation.navigate(AppScreens.CovidError, {
                                name: name,
                                email: email,
                                reason: 'Attended large gathering',
                                concerns: concerns,
                            });
                        } else if (isolate) {
                            navigation.navigate(AppScreens.CovidError, {
                                name: name,
                                email: email,
                                reason: 'Asked to self isolate',
                                concerns: concerns,
                            });
                        } else {
                            navigation.navigate(AppScreens.SignInLanding, {
                                name: name,
                                email: email,
                                traveled: traveled,
                                contact: contact,
                                concerns: concerns,
                                gatherings: gatherings,
                                isolate: isolate,
                            });
                        }
                    }}
                />
                <Button color="#884633" title="Back" onPress={() => navigation.pop()} />
                <Button color="#884633" title="Home" onPress={() => navigation.popToTop()} />
            </View>
        </ScrollView>
    );
};

export default CovidInformationScreen;
