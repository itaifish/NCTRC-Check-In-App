import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
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
        borderWidth: 1
    },
    smallButton: {
        backgroundColor: '#884633',
        borderRadius: 9, 
        margin: 20, 
        height: 60, 
        width: 180, 
        alignItems: 'center',
    },
    landingScreenBoxes: {
        borderColor: '#884633', 
        borderRadius: 9, 
        alignItems: 'center',
        padding: 50,
        marginTop: -150, 
        borderWidth: 1
    },
    landingScreenBoxText: {
        color: '#884633',
        fontSize: 15, 
        margin: 40, 
    }
});