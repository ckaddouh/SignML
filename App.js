import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Image, Animated, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useRef, useEffect} from 'react';
import AwesomeButton from "react-native-really-awesome-button";
import * as Animatable from 'react-native-animatable';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {drawRect} from "./utilities"; 
import { Camera } from 'expo-camera';

function StartScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style = {styles.title}>SIGNML</Animatable.Text>
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
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;

  }
  return (
    <View style={styles.container}>
    <Camera style={styles.camera} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={next => {navigation.navigate('Home')
          next();
        }}>
          <Text style={styles.text}> Return </Text>
        </TouchableOpacity>
      </View>
    </Camera>
    </View>
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

  const camRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
    const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  // takePicture = async () => {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     console.log(data.uri);
  //   }
  // };


  // const detect = async (net) => {
  //   // Check data is available
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Set canvas height and width
  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;

  //     // 4. TODO - Make Detections
  //     const img = tf.browser.fromPixels(video)
  //     const resized = tf.image.resizeBilinear(img, [640,480])
  //     const casted = resized.cast('int32')
  //     const expanded = casted.expandDims(0)
  //     const obj = await net.executeAsync(expanded)
  //     console.log(obj)

  //     const boxes = await obj[1].array()
  //     const classes = await obj[2].array()
  //     const scores = await obj[4].array()
      
  //     // Draw mesh
  //     const ctx = canvasRef.current.getContext("2d");

  //     // 5. TODO - Update drawing utility
  //     // drawSomething(obj, ctx)  
  //     requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 

  //     tf.dispose(img)
  //     tf.dispose(resized)
  //     tf.dispose(casted)
  //     tf.dispose(expanded)
  //     tf.dispose(obj)

  //   }
  // };

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
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },

});

export default App;