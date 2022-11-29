import {StyleSheet, Dimensions} from "react-native";

export default StyleSheet.create({
    container:
        {
            flex: 1,
            flexDirection: 'column',
            // justifyContent: 'flex-start',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#fff'
        },

    welcomeText:
        {
            fontSize: 50,
            fontWeight: 'bold',
            marginLeft: 20,
            marginBottom: 20,
            color: '#1C1E1F'
        },

    questionText:
        {
            fontSize: 20,
            marginLeft: 20,
            color: "#1C1E1F"
        },

    continueContainer:
        {
            position: 'absolute',
            bottom: 40,
            right: 20
        },

    continueInnerContainer:
        {
            padding: 10,
            backgroundColor: "#d7d7d7",
            borderRadius: 10
        },

    continueText:
        {
            fontSize: 15,
            color: "#1C1E1F"
        },

    introImage:
        {
            height: 300,
            width: 350,
            position: 'absolute',
            bottom: 30,

        },

    introImageTwo:
        {
            height: 350,
            width: 350,
            position: 'absolute',
            top: -100,
            right: -100

        }
})