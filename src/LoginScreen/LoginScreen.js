import React, { useState } from "react";
import {Dimensions, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {firebase} from '../firebase/firebase';
import styles from "./styles";

export default function LoginScreen({navigation, setUser})
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registrationSwitch()
    {
        navigation.navigate('Register');
    }

    function loginPress()
    {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then( (response) => {
                const userid = response.user.uid;

                const usersRef = firebase.firestore().collection('users');

                usersRef
                    .doc(userid)
                    .get()
                    .then(document => {
                        if (!document.exists)
                        {
                            alert("User doesn't exits anymore.");
                            return;
                        }

                        const user = document.data();
                        setUser(user);
                        navigation.navigate('Home', {user});
                    })
                    .catch(err => {
                        console.log(1);
                        alert(err);
                    });
            })
            .catch(err => {
                console.log(2);
                alert(err);
            });

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{flex: 1, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}} keyboardShouldPresistTaps='always'>
                <View style={styles.container}>
                    <Image style={styles.loginImage} source={require('../../assets/star.png')}/>
                    <TextInput
                        style={styles.inputEmailBox}
                        placeholder={'E-mail'}
                        placeholderTextColor='#aaaaaa'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                    />

                    <TextInput
                        style={styles.inputPasswordBox}
                        placeholder={'Password'}
                        placeholderTextColor='#aaaaaa'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => loginPress()}>
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableOpacity>

                    <View style={styles.switchContainer}>
                        <Text>Don't have an account? <Text style={styles.switchText} onPress={registrationSwitch}>Sign up</Text></Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )

}