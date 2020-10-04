import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
type MaxCapScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.MaxCap>;
interface MaxCapScreenProps {
    navigation: MaxCapScreenNavigationProps;
}
const styles = StyleSheet.create({

});
const MaxCapScreen: React.FunctionComponent<MaxCapScreenProps> = (props) => {
    const { navigation } = props;
return (
        <SafeAreaView>
            <View>
                <Image source={require('./../assets/NCTRClogo.png')} style={{width: 400, height: 400}}></Image>
                <Text>Max cap</Text>
                <Button color='#884633' title="Home" onPress={() => navigation.navigate(AppScreens.Home)} />

            </View>
        </SafeAreaView>
    );
};
export default MaxCapScreen;