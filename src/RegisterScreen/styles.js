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

    inputBox:
        {
            width: '80%',
            backgroundColor: "#e9e9e9",
            height: 60,
            padding: 15,
            borderRadius: 10,
            marginTop: 20
        },

    registerButton:
        {
            width: '70%',
            backgroundColor: "#1C1E1F",
            height: 50,
            padding: 14,
            marginTop: 50,
            borderRadius: 15
        },

    registerText:
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

    registerImage:
        {
            height: 834,
            width: 949,
            position: 'absolute',
            top: -150,
            right: -300
        }




})