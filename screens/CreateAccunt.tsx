import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { Button, RadioButton, Text, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from '../services/axiosConfig';


function CreateAccount({ navigation, route }: any): JSX.Element {

    const { singUpedUserData } = route.params;
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address: '',
        contact: '',
        email: '',
        birth: '',
        gender: '',
        location: '',
        category: '',
        role:'',
        id:''
    });
    const [showDropDown, setShowDropDown] = useState(false);
    const categoryList = [
        {
            label: "Painter",
            value: "Painter",
        },
        {
            label: "Mower",
            value: "Mower",
        },
        {
            label: "Coconut plucker",
            value: "Coconut plucker",
        },
    ]

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const handleInputChange = (key: any, value: any) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    async function saveData(data: any) {
        console.log(data)
        await axios.post(`/api/account/create_account`, data).then(res => {
            if (res.status == 200) {
                console.log("Account created")
                navigation.navigate('Home');
            }
        })
            .catch(error => {
                // Handle errors here
                console.error('API call error:', error);

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
                        placeholder="First Name*"
                        onChangeText={(value) => handleInputChange('fname', value)}
                        value={formData.fname}
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Last Name*"
                        onChangeText={(value) => handleInputChange('lname', value)}
                        value={formData.lname}
                    ></TextInput>
                    {singUpedUserData.role == 'Worker' ?
                        (
                            <View style={styles.textInput}>
                                <DropDown
                                    label={"Category"}
                                    visible={showDropDown}
                                    showDropDown={() => setShowDropDown(true)}
                                    onDismiss={() => setShowDropDown(false)}
                                    value={formData.category}
                                    setValue={(value) => handleInputChange('category', value)}
                                    list={categoryList}
                                ></DropDown></View>) : null
                    }
                    <TextInput
                        style={styles.textInput}
                        placeholder="Address*"
                        onChangeText={(value) => handleInputChange('address', value)}
                        value={formData.address}
                        multiline={true}
                        numberOfLines={3}
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Contact*"
                        onChangeText={(value) => handleInputChange('contact', value)}
                        value={formData.contact}
                        keyboardType="numeric"
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email*"
                        onChangeText={(value) => handleInputChange('email', value)}
                        value={formData.email}
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Date of birth*"
                        onChangeText={(value) => handleInputChange('birth', value)}
                        value={formData.birth}
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Gender*"
                        onChangeText={(value) => handleInputChange('gender', value)}
                        value={formData.gender}
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Current location*"
                        onChangeText={(value) => handleInputChange('location', value)}
                        value={formData.location}
                    ></TextInput>

                </View>

                <View style={styles.logingContainer}>
                    {singUpedUserData.role == 'Worker'? <Button style={styles.loginBtn} mode="contained" onPress={() => {
                       
                       formData['role'] = singUpedUserData.role
                       formData['id'] = singUpedUserData.id
                        navigation.navigate('CreateAccuntStep2', { formData });

                        }}>
                        Next
                    </Button>:<View style={styles.logingContainer}>
                    <Button style={styles.loginBtn} mode="contained" onPress={async () => {
                        // formData.descrip = experienceeInputValue;
                        formData['role'] = singUpedUserData.role
                        formData['id'] = singUpedUserData.id
                        console.log(formData)
                        await saveData(formData)
                    }}>
                        Create
                    </Button>
                </View>}
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

export default CreateAccount;