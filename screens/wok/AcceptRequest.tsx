import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from '../../services/axiosConfig'

function AcceptRequest({ navigation, route }: any): JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const { logedUser, data } = route.params;

    async function accrept_reject_request(status) {
        let Reqdata = {
            "cus_id": data.id,
            "woker_id": logedUser.id,
            "requested": status
        }
        await axios.post('/api/request/update_request', Reqdata).then(res => {
            if (res.status == 200) {
                navigation.navigate('WokerDash', { logedUser });
            }
        })
    }


    return (
        <View>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AccountWoker', { logedUser });
                }}>
                    <Image style={styles.imgsIco} source={require('../../assets/icons/account.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('WokerDash', { logedUser });
                }}>
                    <Image style={styles.imgsIco} source={require('../../assets/icons/notification_c.png')} />
                </TouchableOpacity>

            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"

            >
                <View style={styles.outerContainer} >
                    <View style={styles.container}>
                        <View style={styles.centerView}>
                            <View style={styles.circle}>
                                <Image style={styles.imgs} source={require('../../assets/images/blank-pfp.png')} />

                            </View>
                            <Text style={styles.cateTitle} >{data.fname} {data.lname}</Text>
                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={styles.iconsStels} source={require('../../assets/icons/icons8-phone-50.png')} />
                                    <Text style={styles.normalText}>{data.contact}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={styles.iconsStels} source={require('../../assets/icons/icons8-email-50.png')} />
                                    <Text style={styles.normalText}>{data.email}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={styles.iconsStels} source={require('../../assets/icons/icons8-location-50.png')} />
                                    <Text style={styles.normalText}>{data.address}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Button style={styles.loginBtn} mode="contained" onPress={async () => {
                                    //   logInToSysytem(usernameInputValue, passwordInputValue);
                                    console.log('Conform')
                                    await accrept_reject_request("2");
                                }}>
                                    Conform
                                </Button>
                                <Button style={styles.loginBtn} mode="contained" onPress={async () => {
                                    //   logInToSysytem(usernameInputValue, passwordInputValue);
                                    console.log('Decline')
                                    await accrept_reject_request("3");
                                    // make_request_for_work();
                                }}>
                                    Decline
                                </Button>
                            </View >
                        </View>
                        <View >
                            <Text style={styles.DiscTitle} >Location details</Text>
                            <Text style={styles.normalText} >{data.location}</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    button: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#F9A54E',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25
    },
    buttonText: {
        color: 'white',
    },
    workImg: {
        marginTop: 20,
        height: 200,
        width: 200,
        alignContent: "flex-start",
        resizeMode: "contain",
    },
    PhotoTitle: {
        marginLeft: 30,
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 25
    },
    startBar: {
        height: 40,
        width: 125,
        alignContent: "flex-start",
        resizeMode: "contain",
    },
    centerView: {
        marginTop: 5,
        justifyContent: "center",
        alignItems: 'center'
    },
    centerViewForRatings: {

        marginTop: 10,
        marginBottom: 25,
        flexDirection: 'row',
    },
    loginBtn: {
        width: "auto",
        marginTop: 45,
        marginRight: 10
    },
    imgsIco: {
        height: 30,
        width: 30,
        alignContent: "center",
        resizeMode: "contain",
        margin: 8
    },
    iconsStels: {
        height: 20,
        width: 20,
        alignContent: "flex-start",
        resizeMode: "contain",
        margin: 8
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25
    },

    outerContainer: {
        marginBottom: 50
    },
    cateTitle: {
        color: "#3788D3",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10
    },
    DiscTitle: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30
    },
    normalText: {
        color: "#3788D3",
        marginTop: 10
    },
    imgs: {
        width: '100%',
        height: '100%',
    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 50,
        overflow: 'hidden',
    },
    container: {
        marginTop: 50,
        flex: 1,
        borderWidth: 1,
        borderColor: '#85E9F7',
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        padding: 10
    },

});

export default AcceptRequest;