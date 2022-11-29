import {Dimensions, StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('screen').height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#fff'
    },

    inputEmailBox:
        {
            width: '80%',
            backgroundColor: "#e9e9e9",
            height: 60,
            padding: 15,
            borderRadius: 10,
        },

    inputPasswordBox:
        {
            width: '80%',
            backgroundColor: "#e9e9e9",
            height: 60,
            padding: 15,
            borderRadius: 10,
            marginTop: 20
        },

    loginButton:
        {
            width: '70%',
            backgroundColor: "#1C1E1F",
            height: 50,
            padding: 14,
            marginTop: 50,
            borderRadius: 15
        },

    loginText:
        {
            color: '#EFF2F1',
            textAlign: "center",

        },

    switchContainer:
        {
            position: 'absolute',
            bottom: 40,
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 15
        },

    switchText:
        {
            color: "#0000ff"
        },

    loginImage:
        {
            height: 987,
            width: 428,
            position: 'absolute',
            top: 0,
            right: 0
        }




})