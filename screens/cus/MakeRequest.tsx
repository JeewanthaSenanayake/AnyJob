import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from '../../services/axiosConfig'

function MakeRequest({ navigation, route }: any): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const { logedUser, wokerId } = route.params;
    const [data, setData] = useState({});

    async function make_request_for_work() {
        // console.log(logedUser.id," > ",wokerId)
        let data = {

            "cus_id": logedUser.id,
            "woker_id": wokerId,
            "requested": "1"

        }
        await axios.post('/api/request/make_request', data).then(res => {
            if (res.status == 200) {
                console.log("requested")
                navigation.navigate('CustomerDash', { logedUser });
            }
        }).catch(error => {
            // Handle errors here
            console.error('API call error:', error);

        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`/api/woker/get_woker_by_id/${wokerId}`).then(res => {
                    if (res.status == 200) {
                        console.log("woker>>>>>>>>>>>>", res.data)
                        setData(res.data)
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CustomerDash', { logedUser });
                }}>
                    <Image style={styles.imgsIco} source={require('../../assets/icons/home_c.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Notification', { logedUser });
                }}>
                    <Image style={styles.imgsIco} source={require('../../assets/icons/notification.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Account', { logedUser });
                }}>
                    <Image style={styles.imgsIco} source={require('../../assets/icons/account.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"

            >
                <View style={styles.outerContainer} >
                    <View style={styles.container}>
                        <View style={styles.centerView}>
                            <View style={styles.circle}>
                                {/* <Image style={styles.imgs} source={{ uri: data.pImgUrl }} /> */}
                                <Image style={styles.imgs} source={(data.pImgUrl == null || data.pImgUrl == "") ? require('../../assets/images/blank-pfp.png') : { uri: data.pImgUrl }} />

                            </View>
                            <Text style={styles.cateTitle} >{data.fname} {data.lname}</Text>
                            <Text style={styles.normalText}>{data.category}</Text>
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
                            <Button style={styles.loginBtn} mode="contained" onPress={() => {
                                //   logInToSysytem(usernameInputValue, passwordInputValue);
                                console.log('Request')
                                make_request_for_work();
                            }}>
                                Request
                            </Button>
                        </View>
                        <View >
                            <Text style={styles.DiscTitle} >Discription</Text>
                            <Text style={styles.normalText} >{data.descrip}</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.DiscTitle} >{data.rating}</Text>
                            <Image style={styles.startBar} source={
                                data.rating >= 0 && data.rating < 1 ?
                                    require('../../assets/star/s_0.png') :
                                    data.rating >= 1 && data.rating < 2 ?
                                        require('../../assets/star/s_1.png') :
                                        data.rating >= 2 && data.rating < 3 ?
                                            require('../../assets/star/s_2.png') :
                                            data.rating >= 3 && data.rating < 4 ?
                                                require('../../assets/star/s_2.png') :
                                                data.rating >= 4 && data.rating < 5 ?
                                                    require('../../assets/star/s_4.png') :
                                                    require('../../assets/star/s_5.png')
                            } />
                        </View>
                    </View>

                    <Text style={styles.PhotoTitle} >
                        Photos
                    </Text>
                    <View style={styles.centerView}>
                        {/* <Image style={styles.workImg} source={{ uri: data.workImgUrl }} /> */}
                        {(data.workImgUrl == null || data.workImgUrl == "") ? <Text style={{
                            fontSize: 15,
                            color: "#8C8781",
                            alignContent: "center",
                            alignSelf: "center",
                            marginTop: 25
                        }}>No photos available</Text> : <Image style={styles.workImg} source={{ uri: data.workImgUrl }} />}
                    </View>

                    <Text style={styles.PhotoTitle} >
                        Rate me
                    </Text>
                    <View style={styles.centerViewForRatings}>
                        <TouchableOpacity onPress={() => { console.log(1) }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { console.log(2) }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { console.log(3) }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { console.log(4) }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { console.log(5) }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>5</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
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
        width: 200,
        marginTop: 45,
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
        marginTop: 10
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

export default MakeRequest;