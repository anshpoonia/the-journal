import React, { useEffect, useState, useRef } from "react";
import {FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Dimensions, Image} from "react-native";
import {firebase} from "../firebase/firebase";
import * as Location from 'expo-location';
import MapView, {Marker} from "react-native-maps";
import styles from "./styles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Camera, CameraType} from "expo-camera";


export default function HomeScreen({navigation, userData, signOut})
{

    const camera = useRef(null);

    const [loading, setLoading] = useState(false);
    const [map, setMap] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);

    const [entriesArray, setEntriesArray] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const databaseRef = firebase.firestore().collection('entries');




    useEffect(() => {

        Camera
            .requestCameraPermissionsAsync()
            .then(res => {
                if ( res.status === 'granted' )
                {
                    Location
                        .requestForegroundPermissionsAsync()
                        .then(res => {
                            if (res.status === 'granted')
                            {
                                databaseRef
                                    .where('authorID', '==', userData.id)
                                    .orderBy('createdAt', 'desc')
                                    .onSnapshot(snapshot => {
                                            const tempEntries = [];
                                            snapshot.forEach(doc => {
                                                const tempEntry = doc.data();
                                                tempEntry.id = doc.id;
                                                tempEntries.push(tempEntry);
                                            });
                                            setEntriesArray(tempEntries);
                                        },
                                        error => {
                                            console.log(error);
                                        });
                            }
                            else
                            {
                                signOut();
                            }
                        })
                        .catch(err => {
                            alert(err);
                        })
                }
            })
            .catch(err => {
                alert(err);
            });


    }, [])

    async function addNewEntry(isPic, imageData)
    {
        setLoading(true);
        if (isPic) setOpenCamera(false);
        const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
        const location = await Location.getCurrentPositionAsync();
        const data = {
            id: userData.id + Math.random()*10000000,
            authorID: userData.id,
            createdAt: timeStamp,
            isPic: isPic,
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            heading: "",
            text: imageData
        };
        setSelectedEntry(data);
        setEntriesArray([data, ...entriesArray]);
        setLoading(false);
    }

    function updateEntry()
    {
        setLoading(true);
        const temp = entriesArray.map(value => {
            if (value.id === selectedEntry.id)
            {
                return selectedEntry;
            }
            return value;
        });

        databaseRef
            .doc(selectedEntry.id)
            .set({
                authorID: selectedEntry.authorID,
                createdAt: selectedEntry.createdAt,
                location: selectedEntry.location,
                isPic: selectedEntry.isPic,
                heading: selectedEntry.heading,
                text: selectedEntry.text,
            })
            .then(() => {
                setEntriesArray([...temp]);
                setSelectedEntry(null);
                setLoading(false);
            })
            .catch(err => {
                alert(err);
                setLoading(false)
            })

    }

    function deleteEntry()
    {
        setLoading(true);
        const temp = entriesArray.filter(value => value.id !== selectedEntry.id)

        databaseRef
            .doc(selectedEntry.id)
            .delete()
            .then(() => {
                setEntriesArray([...temp]);
                setSelectedEntry(null);
                setLoading(false);
            })
            .catch(err => {
                alert(err);
                setLoading(false)
            });

    }


    function renderEntry({item, index})
    {

        if (item.isPic)
        {
            return (
                <TouchableOpacity
                    style={ index%2 === 0 ? styles.entryImage : styles.entryImageDark}
                    onPress={() => setSelectedEntry(item)}>
                    <Image style={styles.entryImg} source={{uri: 'data:image/png;base64,'+item.text}}/>
                    <Text style={ index%2 === 0 ? styles.entryImageText : styles.entryImageDarkText}>
                        {item.heading}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity
                style={ index%2 === 0 ? styles.entry : styles.entryDark}
                onPress={() => setSelectedEntry(item)}>
                <Text style={ index%2 === 0 ? styles.entryHeading : styles.entryDarkHeading}>
                    {item.heading}
                </Text>
                <Text style={ index%2 === 0 ? styles.entryText : styles.entryDarkText}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        )
    }

    async function takePic()
    {
        const options = {
            quality: 0.3,
            base64: true,
            exif: false
        }
        const res = await camera.current.takePictureAsync(options);
        const res1 = await addNewEntry(true, res.base64);
    }

    if (loading)
    {
        return (
            <View style={styles.loadingScreen}>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }

    if (selectedEntry !== null)
    {
        if (selectedEntry.isPic)
        {
            return (
                <View style={styles.container}>
                    <KeyboardAwareScrollView style={{flex: 1, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}} keyboardShouldPresistTaps='always'>
                        <View style={styles.container}>
                            <View style={styles.topBar}>
                                <TouchableOpacity onPress={updateEntry}>
                                    <Image style={styles.backButtonImage} source={require('../../assets/back-arrow.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.binButtonContainer} onPress={deleteEntry}>
                                    <Image style={styles.binButtonImage} source={require('../../assets/bin.png')}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainBody}>
                                <Text style={styles.editDateTime}>
                                    {new Date().toDateString()}
                                </Text>

                                <TextInput
                                    style={styles.editInputHeadingBox}
                                    placeholder={"Give me a heading..."}
                                    value={selectedEntry.heading}
                                    onChangeText={text => setSelectedEntry({...selectedEntry, heading: text})}
                                    placeholderTextColor="#ddd"
                                    multiline={true}
                                    underlineColorAndroid={'transparent'}
                                    autoCapitalize={'sentences'}
                                />

                                <Image style={styles.editImage} source={{uri: 'data:image/png;base64,'+selectedEntry.text}}/>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={{flex: 1, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}} keyboardShouldPresistTaps='always'>
                    <View style={styles.container}>
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={updateEntry}>
                                <Image style={styles.backButtonImage} source={require('../../assets/back-arrow.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.binButtonContainer} onPress={deleteEntry}>
                                <Image style={styles.binButtonImage} source={require('../../assets/bin.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainBody}>
                            <Text style={styles.editDateTime}>
                                {new Date().toDateString()}
                            </Text>

                            <TextInput
                                style={styles.editInputHeadingBox}
                                placeholder={"Give me a heading..."}
                                value={selectedEntry.heading}
                                onChangeText={text => setSelectedEntry({...selectedEntry, heading: text})}
                                placeholderTextColor="#ddd"
                                multiline={true}
                                underlineColorAndroid={'transparent'}
                                autoCapitalize={'sentences'}
                            />

                            <TextInput
                                style={styles.editInputTextBox}
                                placeholder={"So what's on your mind..."}
                                value={selectedEntry.text}
                                onChangeText={text => setSelectedEntry({...selectedEntry, text: text})}
                                placeholderTextColor="#ddd"
                                multiline={true}
                                underlineColorAndroid={'transparent'}
                                autoCapitalize={'sentences'}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }

    if (map)
    {
        return (
            <View style={styles.containerWithout}>

                <View style={styles.nameTopBar}>
                    <Text style={styles.topBarDateTime}>
                        {new Date().toDateString()}
                    </Text>
                    <TouchableOpacity
                        onPress={() => alert("Press and hold for logout.")}
                        onLongPress={() => signOut()}>
                        <Text style={styles.topBarName}>
                            {userData.fullName}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <MapView
                        style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }}
                        initialRegion={{
                        latitude: entriesArray[0].location.latitude,
                        longitude: entriesArray[0].location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>

                        {
                            entriesArray.map((value, index) =>
                            {
                                if (value.isPic)
                                {
                                    return (
                                        <Marker
                                            key={index}
                                            coordinate={value.location}
                                            title={value.heading}
                                            description="Image"
                                        />
                                    )
                                }
                                return (
                                    <Marker
                                        key={index}
                                        coordinate={value.location}
                                        title={value.heading}
                                        description={value.text}
                                    />
                                )
                            })
                        }

                    </MapView>
                </View>

                <View style={styles.menuBar}>
                    <TouchableOpacity onPress={() => {
                        setMap(false);
                    }}>
                        <Image style={styles.menuButton} source={require('../../assets/map-one.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setMap(false);
                        setOpenCamera(true);
                    }}>
                        <Image style={styles.menuButton} source={require('../../assets/camera.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setMap(false);
                            addNewEntry(false, "")
                    }}>
                        <Image style={styles.menuButton} source={require('../../assets/add.png')}/>
                    </TouchableOpacity>

                </View>


            </View>
        )
    }

    if (openCamera)
    {
        return (
            <View style={styles.containerBlack}>

                <View style={styles.cameraHolder}>
                    <Camera style={styles.camera} autoFocus={true} type={CameraType.back} ref={camera}/>
                    <TouchableOpacity onPress={takePic} style={styles.cameraButtonHolder}>
                        <View style={styles.cameraButton}></View>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuBar}>
                    <TouchableOpacity onPress={() => {

                        setOpenCamera(false);
                        setMap(true);
                    }}>
                        <Image style={styles.menuButton} source={require('../../assets/map-one.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpenCamera(false)}>
                        <Image style={styles.menuButton} source={require('../../assets/camera.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setOpenCamera(false);
                        addNewEntry(false, "");
                    }}>
                        <Image style={styles.menuButton} source={require('../../assets/add.png')}/>
                    </TouchableOpacity>

                </View>
            </View>

        )
    }




    return (
        <View style={styles.containerWithout}>

            <View style={styles.nameTopBar}>
                <Text style={styles.topBarDateTime}>
                    {new Date().toDateString()}
                </Text>
                <TouchableOpacity
                    onPress={() => alert("Press and hold for logout.")}
                    onLongPress={() => signOut()}>
                    <Text style={styles.topBarName}>
                        {userData.fullName}
                    </Text>
                </TouchableOpacity>
            </View>

            {
                entriesArray.length > 0 && (
                    <FlatList
                        style={styles.listHolder}
                        data={entriesArray}
                        renderItem={renderEntry}/>
                )
            }

            <View style={styles.menuBar}>
                <TouchableOpacity onPress={() => setMap(true)}>
                    <Image style={styles.menuButton} source={require('../../assets/map-one.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenCamera(true)}>
                    <Image style={styles.menuButton} source={require('../../assets/camera.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addNewEntry(false, "")}>
                    <Image style={styles.menuButton} source={require('../../assets/add.png')}/>
                </TouchableOpacity>

            </View>


        </View>
    )
}