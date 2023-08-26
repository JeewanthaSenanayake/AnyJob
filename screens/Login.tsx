/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


function LoginScreen({navigation}:any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.black,
  };


  return (
    <ImageBackground
      source={require('../assets/background/bg.jpg')}
      style={styles.imageBackground}
    >
    {/* <SafeAreaView style={backgroundStyle}> */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >

        <View style={styles.container}>
          <Image style={styles.imgs} source={require('../assets/images/anyjob.png')} />
        </View>

        <Text style={styles.mainTitle}>Welcome</Text>

        <View style={styles.textInputView}>

          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={setUsernameInputValue}
            value={usernameInputValue}
            left={
              <TextInput.Icon
                icon={require('../assets/icons/username.png')}
              />
            }

          ></TextInput>


          <TextInput
            style={styles.textInput}
            label="Password"
            secureTextEntry={secureTextEntry}
            onChangeText={setPasswordInputValue}
            value={passwordInputValue}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? require('../assets/icons/eye.png') : require('../assets/icons/eye-off.png')}
                onPress={() => {
                  setSecureTextEntry(!secureTextEntry);
                  return false;
                }}
              />
            }
            left={
              <TextInput.Icon
                icon={require('../assets/icons/password.png')}
              />
            }
          />
          <View style={styles.logingContainer}>
            <Button style={styles.loginBtn} mode="contained" onPress={() => console.log('Login')}>
              Login
            </Button>
            <Text style={{ textAlign: "left",fontWeight: "bold", marginTop: 25 }} onPress={() => console.log('Forgot password?')}>Forgot password?</Text>
            <View style={{ flexDirection: 'row', justifyContent: "flex-start",marginTop: 25 }}>
            <Text>Don't have an account?</Text>
            <Text style={{ fontWeight: "bold" }} onPress={() => {
              console.log('Sign Up');
              navigation.navigate('SingUp')
              }}>Sign Up</Text>
          </View>
          </View>
          
        </View>
      </ScrollView>
    {/* </SafeAreaView> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color:"white"
  },
  imgs: {
    height: 225,
    width: 225,
    alignContent: "center",
    resizeMode:"contain"
  },
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginTop: 20,
  },
  loginBtn: {
    width: 200,
    marginTop: 45,
  },
  logingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover', // This adjusts the image to cover the entire component
    justifyContent: 'center', // Align content vertically
    // alignItems: 'center', // Align content horizontally
  },




  textInputView: {
    padding: 40
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LoginScreen;
