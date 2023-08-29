/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
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



function SingUpScreen({ navigation }: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordConInputValue, setPasswordConInputValue] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryCon, setSecureTextEntryCon] = useState(true);

  // const [data, setData] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function SingUp() {
    // create account
    if (usernameInputValue != '' && emailInputValue != "" &&
      (passwordInputValue == passwordConInputValue) && passwordConInputValue != '') {
        let userCred = {
          "uname":usernameInputValue,
          "password":passwordInputValue,
          "email":emailInputValue
        }
      navigation.navigate('Category', {userCred});
    } else {
      console.log("no data");
    }

  }


  return (
    <ImageBackground
      source={require('../assets/background/bg.jpg')}
      style={styles.imageBackground}
    >
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

        <Text style={styles.mainTitle}>Sign Up</Text>

        <View style={styles.textInputView}>

          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={setUsernameInputValue}
            value={usernameInputValue}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={setEmailInputValue}
            value={emailInputValue}
            autoCapitalize="none"
            keyboardType="email-address"
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
          />

          <TextInput
            style={styles.textInput}
            label="Confirm password"
            secureTextEntry={secureTextEntryCon}
            onChangeText={setPasswordConInputValue}
            value={passwordConInputValue}
            right={
              <TextInput.Icon
                icon={secureTextEntryCon ? require('../assets/icons/eye.png') : require('../assets/icons/eye-off.png')}
                onPress={() => {
                  setSecureTextEntryCon(!secureTextEntryCon);
                  return false;
                }}
              />
            }
          />


          <View style={styles.logingContainer}>
            <Button style={styles.loginBtn} mode="contained" onPress={() => SingUp()}>
              Sign Up
            </Button>
            
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    marginLeft: 40,
    color: "white"
  },
  imgs: {
    height: 225,
    width: 225,
    alignContent: "center",
    resizeMode: "contain"
  },
  container: {
    marginTop: 40,
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
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
  },

});

export default SingUpScreen;
