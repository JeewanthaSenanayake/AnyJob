import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from '../../services/axiosConfig'


function Notification({ navigation, route }: any): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const { logedUser, selectedCategory } = route.params;
    const [data, setData] = useState([]);

    function MakeRequest(wokerId) {
        navigation.navigate('MakeRequest', { logedUser, wokerId });
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`/api/request/cus_notification/${logedUser.id}`).then(res => {
                    if (res.status == 200) {
                        console.log(res.data)
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
                    <Image style={styles.imgsIco} source={require('../../assets/icons/home.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Notification', { logedUser });
                }}>
                    <Image style={styles.imgsIco} source={require('../../assets/icons/notification_c.png')} />
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
                    <Text style={styles.cateTitle} >Notifications</Text>
                    <View>
                        {data.length==0?<Text style={styles.noRequest}>No Notifications available</Text>:data.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity onPress={() => MakeRequest(item.wokerId)}>
                                    <View style={styles.container} >
                                        <View style={styles.circle}>
                                            <Image style={styles.imgs} source={item.status == 2 ? require('../../assets/icons/ok.jpg') : require('../../assets/icons/wrong.jpg')} />
                                        </View>
                                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.name}</Text>
                                            <Text style={{ fontWeight: "bold" }}>{item.category}</Text>
                                            <Text style={{ fontWeight: "bold" }}>{item.status == 2?"Conformed":"Declined" }</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>



            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    noRequest:{
        fontSize:25,
        color:"#8C8781",
        alignContent:"center",
        alignSelf:"center",
        marginTop:50
    },
    imgsIco: {
        height: 30,
        width: 30,
        alignContent: "center",
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
        marginBottom: 50,
        padding: 25
    },
    cateTitle: {
        color: "blue",
        fontSize: 20,
        fontWeight: "bold"

    },
    imgs: {
        width: '100%',
        height: '100%',
    },
    container: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#B2AAA9',
        borderRadius: 10,

        backgroundColor: "#2987E2",
        padding: 10,

    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 50,
        overflow: 'hidden',
    },

});

export default Notification;