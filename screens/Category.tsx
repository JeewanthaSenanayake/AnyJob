
import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import axios from '../services/axiosConfig';

function Category({ navigation, route }: any): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const { userCred } = route.params;
    let userData = "";

    async function singUpToUser(data: any) {
        await axios.post(`/api/auth/sing_up`, data).then(
            res => {
                if (res.status == 200) {


                    let singUpedUserData = {
                        "role": data.role,
                        "id": res.data.id
                    }
                    console.log(singUpedUserData);
                    navigation.navigate('CreateAccount', { singUpedUserData })
                }

                // 

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
                    <Image style={styles.imgs} source={require('../assets/images/anyjob.png')} />
                </View>

                <Text style={styles.categoryTitle}>Select your category</Text>

                <View style={styles.btnView}>
                    <Button style={styles.loginBtn} mode="contained" onPress={async () => {
                        console.log('Worker');

                        let category = "Worker";
                        userCred.role = category;
                        await singUpToUser(userCred);
                    }}>Worker</Button>
                    <Button style={styles.loginBtn} mode="contained" onPress={async () => {
                        console.log('Customer')
                        let category = "Customer";
                        userCred.role = category;
                        await singUpToUser(userCred);
                    }}>Customer</Button>
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
    categoryTitle: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 40,
        fontSize: 20,
        color: "white",
    },
    loginBtn: {
        width: 200,
        marginTop: 45,
    },
    btnView: {
        alignItems: "center",
        marginTop: 20,
    }
});

export default Category;