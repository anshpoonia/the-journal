import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {firebase} from '../firebase/firebase';
import styles from "./styles";


export default function RegisterScreen({navigation, setUser})
{
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function loginSwitch()
    {
        navigation.navigate('Login');
    }

    function registerPress()
    {
        if (password !== confPassword)
        {
            alert("Passwords don't match!");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( response => {
                const userid = response.user.uid;
                const data = {
                    id: userid,
                    email,
                    fullName
                };

                const usersRef = firebase.firestore().collection('users');
                usersRef
                    .doc(userid)
                    .set(data)
                    .then(() => {
                        setUser(data);
                        navigation.navigate('Home', {user: data});
                    })
                    .catch( err => {
                        alert(err);
                    });
            })
            .catch( err => {
                alert(err);
            });

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{flex: 1, width: '100%'}} keyboardShouldPresistTaps='always'>
                <View style={styles.container}>
                    <Image style={styles.registerImage} source={require('../../assets/strokes.png')}/>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={text => setFullName(text)}
                        value={fullName}
                        placeholder='Name'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid='transparent'
                        autoCapitalize={'none'}
                    />

                    <TextInput
                        style={styles.inputBox}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid='transparent'
                        autoCapitalize={'none'}
                    />

                    <TextInput
                        style={styles.inputBox}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder='Password'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid='transparent'
                        autoCapitalize={'none'}
                    />

                    <TextInput
                        style={styles.inputBox}
                        onChangeText={text => setConfPassword(text)}
                        value={confPassword}
                        secureTextEntry={true}
                        placeholder='Confirm Password'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid='transparent'
                        autoCapitalize={'none'}
                    />

                    <TouchableOpacity style={styles.registerButton} onPress={() => registerPress()}>
                        <Text style={styles.registerText}>Sign up</Text>
                    </TouchableOpacity>

                    <View style={styles.switchContainer}>
                        <Text>Already have an account? <Text style={styles.switchText} onPress={loginSwitch}>Log in</Text></Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}