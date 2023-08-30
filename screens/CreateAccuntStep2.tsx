
import React, { useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { Button, RadioButton, Text, TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import axios from '../services/axiosConfig';
import { launchImageLibrary } from 'react-native-image-picker';





function CreateAccuntStep2({ navigation, route }: any): JSX.Element {

    const { formData } = route.params;


    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [experienceeInputValue, setExperienceInputValue] = useState('');
    const [selectedPPImage, setSelectedPPImage] = useState<string | null>(null);
    const [selectedWDImage, setSelectedWDImage] = useState<string | null>(null);


    const ImagePicker = (id) => {

        let options = {
            storageOptions: {
                path: "image",
                multiple: true,
            }

        }

        launchImageLibrary(options, response => {
            console.log(response)
            if (id == 0) {
                setSelectedPPImage(response.assets[0].uri)
            } else {
                setSelectedWDImage(response.assets[0].uri)
            }

        })
    }



    async function saveData(data: any) {
        data.pImgUrl = selectedPPImage;
        data.workImgUrl = selectedWDImage;
        console.log(data)
        await axios.post(`/api/account/create_account`, data).then(res => {
            if (res.status == 200) {
                console.log("Account created")
                navigation.navigate('Home');
            }else{
                Alert.alert("Please fill in all required fields correctly")
            }
        })
            .catch(error => {
                // Handle errors here
                console.error('API call error:', error);
                Alert.alert("Please fill in all required fields correctly")

            });
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
                    <Text style={styles.headerText}>Create Account</Text>
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Work Experience*"
                        onChangeText={setExperienceInputValue}
                        multiline={true}
                        numberOfLines={4}
                        value={experienceeInputValue}
                    ></TextInput>

                </View>
                <View style={styles.container}>
                    {selectedPPImage && <Image style={styles.imgs} source={{ uri: selectedPPImage }} />}
                </View>
                <View style={styles.textInputView}>
                    <Button labelStyle={{
                        fontSize: 18,
                        color: '#FFFFFF',
                    }} onPress={() => { ImagePicker(0) }} >Upload Profile Photo</Button>
                </View>

                <View style={styles.container}>
                    {selectedWDImage && <Image style={styles.imgs} source={{ uri: selectedWDImage }} />}
                </View>
                <View style={styles.textInputView}>

                    <Button labelStyle={{
                        fontSize: 18,
                        color: '#FFFFFF',
                    }} onPress={() => { ImagePicker(1) }} >Upload Work Done Photo</Button>

                </View>

                <View style={styles.logingContainer}>
                    <Button style={styles.loginBtn} mode="contained" onPress={async () => {
                        formData.descrip = experienceeInputValue;

                        console.log(formData)
                        await saveData(formData)
                    }}>
                        Create
                    </Button>
                </View>

            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover', // This adjusts the image to cover the entire component
        justifyContent: 'center', // Align content vertically
        // alignItems: 'center', // Align content horizontally
    },
    imgs: {
        height: 225,
        width: 225,
        alignContent: "center",
        resizeMode: "contain"
    },
    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    headerText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        marginTop: 20,
    },
    textInputView: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
    },
    loginBtn: {
        width: 200,
        marginTop: 45,
        marginBottom: 25,
    },
    logingContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
});

export default CreateAccuntStep2;