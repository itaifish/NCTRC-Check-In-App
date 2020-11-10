import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1, 
        backgroundColor: '#FFFFFF',
        marginTop: 40, 
    },
    home: {
        fontSize: 20,
    },
    homeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    solidButton: {
        backgroundColor: '#884633',
        borderRadius: 9, 
        margin: 20, 
        height: 60, 
        width: 230, 
        alignItems: 'center',
    },
    reasonButton: {
        backgroundColor: '#884633',
        borderRadius: 9, 
        margin: 10, 
        height: 60, 
        width: 230, 
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15, 
        marginTop: 18,
    },
    backButton: {
        alignSelf: 'flex-start'
    }, 
    logo: {
        marginTop: -40, 
        alignSelf: 'center', 
    },
    button: {
       color: '#884633',
    },
    homeDiv: {
        marginBottom: 150,
    },
    question: {
        color: 'grey', 
        fontSize: 15, 
        margin: 10, 
    }, 
    textInput: {
        borderRadius: 9, 
        margin: 10, 
        height: 60, 
        width: 300, 
        paddingHorizontal: 10,
        borderColor: '#884633', 
        borderWidth: 1,
        alignSelf: 'center', 
    },
    smallButton: {
        backgroundColor: '#884633',
        borderRadius: 9, 
        margin: 20, 
        height: 60, 
        width: 180, 
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 50
    },
    landingScreenBoxes: {
        borderColor: '#884633', 
        borderRadius: 9, 
        alignItems: 'center',
        padding: 15,
        marginTop: -150, 
        borderWidth: 1
    },
    landingScreenBoxText: {
        color: '#884633',
        fontSize: 15, 
        margin: 40, 
    }, 
    covidQuestion: {
        color: 'grey', 
        fontSize: 15, 
        alignSelf: 'center',
        margin: 10,
        marginLeft: 20, 
        width: 300, 
    },
    radioContainer: {
        flexDirection: "row",
        alignSelf: 'center', 
        padding: 10,
    }, 
    radioText: {
        color: '#884633', 
        fontSize: 15, 
        padding: 5, 
    }, 
    riskDoc: {
        color: 'grey', 
        padding: 20, 
        marginRight: 25, 
        marginLeft: 25,
    }, 
    riskTitle: {
        fontWeight: 'bold', 
        padding: 20, 
        marginRight: 25, 
        marginLeft: 25,
        fontSize: 15
    }, 
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
      },

});