import {StyleSheet, Dimensions} from "react-native";

export default StyleSheet.create({
    container:
        {
            flex: 1,
            height: Dimensions.get('screen').height,
            alignItems: 'center'
        },

    containerBlack:
        {
            flex: 1,
            height: Dimensions.get('screen').height,
            alignItems: 'center',
            backgroundColor: '#000'
        },

    topBar:
        {
            position: "absolute",
            flexDirection: "row",
            justifyContent: 'space-between',
            top: 0,
            left: 0,
            width: '100%',
            paddingTop: 50,
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.12)',
            height: 90
        },

    backButtonImage:
        {
            height: 35,
            width: 35,
            marginLeft: 15
        },

    binButtonContainer:
        {
            marginRight: 20,
        },

    binButtonImage:
        {
            height: 25,
            width: 25,
        },

    mainBody:
        {
            flex: 1,
            marginTop: 90,
            width: '100%',
            marginLeft: 40
        },

    editDateTime:
        {
            alignSelf: 'flex-start',
            marginLeft: 10,
            fontSize: 11,
            fontWeight: "bold",
            marginTop: 20,
            color: 'rgba(0,0,0,0.3)'
        },

    editInputHeadingBox:
        {
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 25
        },

    editInputTextBox:
        {
            marginTop: 20,
            fontSize: 15
        },

    nameTopBar:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 75,
            paddingTop: 50,
            alignSelf: 'flex-start',
            width: '100%',
            // backgroundColor: '#eee'
        },

    topBarDateTime:
        {
            alignSelf: 'flex-end',
            fontSize: 13,
            fontWeight: 'bold',
            marginLeft: 20,
            color: 'rgba(0,0,0,0.3)'
        },

    topBarName:
        {
            alignSelf: 'flex-end',
            fontSize: 16,
            fontWeight: 'bold',
            marginRight: 20,
            color: 'rgba(0,0,0,0.3)'
        },

    menuBar:
        {
            position: 'absolute',
            bottom: 40,
            borderRadius: 15,
            height: 60,
            padding: 10,
            flexDirection: "row",
            justifyContent: 'space-around',
            alignItems: "center",
            width: '60%',
            backgroundColor: '#0d0e0e',
            alignSelf: 'center'
        },

    menuButton:
        {
            height: 25,
            width: 25
        },

    loadingScreen:
        {
            flex: 1,
            height: Dimensions.get('screen').height,
            alignItems: "center",
            justifyContent: 'center'
        },

    entry:
        {
            marginTop: 10,
            alignSelf: 'center',
            width: '90%',
            padding: 15,
            backgroundColor: "#D7DEDE",
            borderRadius: 15
        },

    entryHeading:
        {
            fontWeight: "bold",
            fontSize: 16,
        },

    entryText:
        {
            marginTop: 10,
            fontSize: 13,
            color: 'rgba(0, 0, 0, 0.4)'
        },

    entryDark:
        {
            marginTop: 10,
            alignSelf: 'center',
            width: '90%',
            padding: 15,
            backgroundColor: "#1C1E1F",
            borderRadius: 15
        },

    entryDarkHeading:
        {
            fontWeight: "bold",
            fontSize: 16,
            color: '#fff'
        },

    entryDarkText:
        {
            marginTop: 10,
            fontSize: 13,
            color: 'rgba(255,255,255, 0.7)'
        },

    listHolder:
        {
            marginTop: 20,
            height: Dimensions.get('screen').height,

        },

    containerWithout:
        {
            flex: 1,
            height: Dimensions.get('screen').height,
        },

    camera:
        {
            height: Dimensions.get('screen').width,
            width: Dimensions.get('screen').width,
            alignSelf: 'center'
        },

    cameraHolder:
        {
            flex: 1,
            alignItems:'center',
            justifyContent: 'center'
        },

    cameraButtonHolder:
        {
            position: "absolute",
            bottom: 150,
        },

    cameraButton:
        {
            height: 60,
            width: 60,
            backgroundColor: "#fff",
            borderRadius: 30
        },

    entryImg:
        {
            height: Dimensions.get('screen').width*0.9,
            width: Dimensions.get('screen').width*0.9,
            borderRadius: 15
        },

    entryImage:
        {
            marginTop: 10,
            alignSelf: 'center',
            width: '90%',
            paddingBottom: 15,
            backgroundColor: "#D7DEDE",
            borderRadius: 15
        },

    entryImageDark:
        {
            marginTop: 10,
            alignSelf: 'center',
            width: '90%',
            paddingBottom: 15,
            backgroundColor: "#1C1E1F",
            borderRadius: 15
        },

    entryImageDarkText:
        {
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 13,
            color: 'rgba(255,255,255, 0.7)'
        },

    entryImageText:
        {
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 13,
            color: 'rgba(0, 0, 0, 0.4)'
        },

    editImage:
        {
            marginTop: 10,
            height: Dimensions.get('screen').width*0.9,
            width: Dimensions.get('screen').width*0.9,
        }


})