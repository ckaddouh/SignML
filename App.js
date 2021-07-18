import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Image, Animated, TouchableHighlight, Alert } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import AwesomeButton from "react-native-really-awesome-button";
import * as Animatable from 'react-native-animatable';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

function StartScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style = {styles.title}>TURBO TEXTER</Animatable.Text>
      <Text>MLSign</Text>
      <AwesomeButton style= {styles.modeButtons1}
        backgroundColor="blue"
        backgroundShadow="blue"
        borderColor="white"
        medium
        secondary
        onPress={next => { navigation.navigate('LearnDecision')
          next();
        }}
      >
        Learning
      </AwesomeButton>

      <AwesomeButton style = {styles.modeButtons2}
        backgroundColor="blue"
        medium
        secondary
        onPress={next => { navigation.navigate('TranslateDecision')
          next();
        }}
      >
        Translation
      </AwesomeButton>

      <AwesomeButton style = {styles.instructionButton}
        backgroundColor="blue"
        medium
        secondary
        onPress={next => { navigation.navigate('About')
          next();
        }}
      >
        About
      </AwesomeButton>



    </SafeAreaView>

  );
}

function LearnDecisionScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Choose what to learn:</Text>
      <AwesomeButton
        backgroundColor="blue"
        color = "#45bf65"
        medium
        secondary
        onPress={next => { navigation.navigate('Home')
          next();
        }}
      >
        BACK
    </AwesomeButton>

    </SafeAreaView>
  );
}

function TranslateDecisionScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Translate stuff:</Text>
      <AwesomeButton
        backgroundColor="blue"
        color = "#45bf65"
        medium
        secondary
        onPress={next => { navigation.navigate('Home')
          next();
        }}
      >
        BACK
    </AwesomeButton>

    </SafeAreaView>
  );
}

function AboutScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>About stuff:</Text>

      <AwesomeButton
        backgroundColor="blue"
        color = "#45bf65"
        medium
        secondary
        onPress={next => { navigation.navigate('Home')
          next();
        }}
      >
        BACK
    </AwesomeButton>

    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={StartScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LearnDecision" component={LearnDecisionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TranslateDecision" component={TranslateDecisionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="End" component={EndScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="End2" component={EndScreen2} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;