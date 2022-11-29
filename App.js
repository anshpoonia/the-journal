import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/LoginScreen/LoginScreen";
import HomeScreen from "./src/HomeScreen/HomeScreen";
import RegisterScreen from "./src/RegisterScreen/RegisterScreen";
import { decode, encode } from 'base-64';
import {firebase} from './src/firebase/firebase';
import styles from "./styles";

if (!global.btoa) {global.btoa = encode}
if (!global.atob) {global.atob = decode}

const Stack = createStackNavigator();

export default function App()
{
    const [introduction, setIntroduction] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
      const userRef = firebase.firestore().collection('users');

      firebase.auth().onAuthStateChanged(user => {
          console.log(user);
          if (user) {
              userRef
                  .doc(user.uid)
                  .get()
                  .then(document => {
                      const userData = document.data()
                      setLoading(false);
                      setUser(userData);
                      setIntroduction(0);
                  })
                  .catch(err => {
                      alert(err);
                  })
          }
          else {
              setLoading(false);
          }
      });
  }, []);


  function signOut()
  {
      firebase
          .auth()
          .signOut()
          .then(() => {
              setUser(null);
          })
          .catch(err => {
              alert(err);
          })
  }

  if (loading)
  {
      return (
          <View style={styles.container}>
              <Text>Loading...</Text>
          </View>
      )
  }

  if (introduction)
  {
      return (
          <View style={styles.container}>
              <Text style={styles.welcomeText}>Welcome!!!</Text>
              <Text style={styles.questionText}>We hope that you are doing well.</Text>
              <Image style={styles.introImage} source={require('./assets/cat.png')}/>
              <Image style={styles.introImageTwo} source={require('./assets/circle-one.png')}/>
              <TouchableOpacity onPress={() => setIntroduction(false)} style={styles.continueContainer}>
                  <View style={styles.continueInnerContainer}>
                      <Text style={styles.continueText}>Continue</Text>
                  </View>
              </TouchableOpacity>
          </View>
      )
  }


  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          { user ? (
              <Stack.Screen name="Home">
                {props => <HomeScreen {...props} userData={user} signOut={signOut} />}
              </Stack.Screen>
          ) : (
              <>
                <Stack.Screen name="Login">
                  {props => <LoginScreen {...props} setUser={setUser}/>}
                </Stack.Screen>
                <Stack.Screen name="Register">
                  {props => <RegisterScreen {...props} setUser={setUser}/>}
                </Stack.Screen>
              </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  )
}

