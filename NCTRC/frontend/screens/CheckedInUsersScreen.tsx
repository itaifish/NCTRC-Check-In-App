import React, {useState} from 'react';
import { SafeAreaView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, AppScreens } from '../index';
import { styles } from './Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { components } from '../domain/domain';
import { signoutUser } from '../handler/handlers';


type CheckedInUsersScreenNavigationProps = StackNavigationProp<AuthStackParamList, AppScreens.CheckedInUsers>;

interface CheckedInUsersScreenProps {
    navigation: CheckedInUsersScreenNavigationProps;
    route: { params: CheckedInParams };
}

export type CheckedInParams = {
    users: Array<components["schemas"]["UserRequestModel"]>;
};


const CheckedInUsersScreen: React.FunctionComponent<CheckedInUsersScreenProps> = (props) => {
    let ex: components["schemas"]["UserRequestModel"] = {
        firstName: "",
        lastName: "",
        email:"",
      };
    const { navigation, route } = props;
    let { params } = route;
    let { users } = params;
    let [user, setUser] = useState(ex); 
    let data: Array<any> = []; 
    users.forEach(function (value) {
        let email: string[] = value.email.split("@");
        let asterick: string = "";
        for(let i = 0; i < email[0].length-1;i++) {
            asterick = asterick.concat("*"); 
        }
        let first: string = email[0].replace(email[0].substring(1, email[0].length), asterick); 
        data.push({
            label: "First Name: " + value.firstName + " Email: " + first + "@" + email[1],
            value: value,
        })
        console.log(value);
    }); 
    
    console.log(users);
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                     <Image source={require('./../assets/backbutton.png')} style={{ width: 75, height: 75 }}></Image>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.logo} onPress={() => navigation.popToTop()}>
                     <Image source={require('./../assets/NCTRClogo.png')} style={{ width: 150, height: 150 }}></Image>
                </TouchableOpacity> 
            <View style={styles.homeContainer}>
            <DropDownPicker
    items={data}
    dropDownStyle={{backgroundColor: '#fafafa', width: 500}}
    containerStyle={{height: 75, width: 500}}
    onChangeItem={item => setUser(item.value)}
/>                
<TouchableOpacity style={styles.solidButton}onPress={() => 
    {
        if(user == null) {

        } else {
        let u: components["schemas"]["UserRequestModel"] = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
        signoutUser(u);
        }

        navigation.navigate(AppScreens.CheckOutLanding)}
    }><Text style={styles.buttonText}>
                    Submit
                 </Text>  
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};
export default CheckedInUsersScreen;