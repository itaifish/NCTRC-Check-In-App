import React, { useState, SetStateAction } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput, Picker } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../Index';
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
const currentCap = 10;

const CovidInformationScreen: React.FunctionComponent<CovidInformationScreenProps> = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { name, email } = params;
    const [traveled, setTraveled] = React.useState(false);
    const [concerns, setConcerns] = useState('');
    const [contact, setContact] = React.useState(false);
    const [gatherings, setGatherings] = React.useState(false);
    const [isolate, setIsolate] = React.useState(false);
    const [travelLabel, setravelLabel] = useState('');
    const [contactLabel, setContactLabel] = useState('');
    const [gatheringsLabel, setGatheringsLabel] = useState('');
    const [isolateLabel, setIsolateLabel] = useState('');
    const [tempurature, setTempurature] = useState('');

    return (
        <ScrollView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 10, height: 10 }}></Image>
                <Text>Name</Text>
                <TextInput placeholder={name} editable={false} />
                <Text>Email</Text>
                <TextInput placeholder={email} editable={false} />
                <Text>
                    Within the past 24 hours have you or anyone in your household experienced any of the following
                    symptoms: fever (over 100.4 F), sore or dry throat, shortness of breath, chest congestion, cough,
                    loss of taste or sense of smell, sneezing, and/or rash?
                </Text>
                <Picker onValueChange={(itemValue) => setContact(itemValue)}>
                    <Picker.Item value="" label="" />
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>Have you traveled out of the country or out of the state within the past 14 days?</Text>
                <Picker onValueChange={(itemValue) => setTraveled(itemValue)}>
                    <Picker.Item value="" label="" />
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>
                    Have you attended an event or gathering of more than 25 people at any point in the last 14 days?
                </Text>
                <Picker onValueChange={(itemValue) => setGatherings(itemValue)}>
                    <Picker.Item value="" label="" />
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>
                    Within the past 14 days, have you received a positive test result for COVID-19 or are you awaiting
                    test results for COVID-19?
                </Text>
                <Picker onValueChange={(itemValue) => setIsolate(itemValue)}>
                    <Picker.Item value="" label="" />
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
                <Text>Tempurature</Text>
                <TextInput onChangeText={(text) => setTempurature(text)} />
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
