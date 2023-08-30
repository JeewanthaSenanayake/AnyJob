import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from '../services/axiosConfig'



function WokerDash({ navigation, route }: any): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const { logedUser } = route.params;
    const [data, setData] = useState([]);

    function MakeRequest(data) {
        navigation.navigate('AcceptRequest', { logedUser, data });
    }


    useEffect(() => {
        const fetchData = async () => {
            console.log(">>>>>>>>>>>>>>> ", logedUser.id)
            try {
                await axios.get(`/api/request/admin_notification/${logedUser.id}`).then(res => {
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
    });


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
                    <Image style={styles.imgsIco} source={require('../assets/icons/account.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('WokerDash', { logedUser });
                }}>
                    <Image style={styles.imgsIco} source={require('../assets/icons/notification_c.png')} />
                </TouchableOpacity>

            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"

            >
                <View style={styles.outerContainer} >
                    <Text style={styles.cateTitle} >Request for you</Text>
                    <View>

                        {data.length == 0 ? <Text style={styles.noRequest}>No request available</Text> : data.map((item, index) => (
                            <View key={index}>
                                {item.status == "1" ? <TouchableOpacity onPress={() => MakeRequest(item.data)}>
                                    <View style={styles.container} >

                                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.data.fname} {item.data.lname}</Text>
                                            <Text style={{ fontWeight: "bold" }}>{item.data.address}</Text>
        
                                            <Text>Satatus : Pending</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity> : <View style={styles.container2} >

                                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.data.fname} {item.data.lname}</Text>
                                        <Text style={{ fontWeight: "bold" }}>{item.data.address}</Text>
                                        {
                                           item.status == "2" ?<Text>Satatus : Approved</Text> :<Text>Satatus : Declined</Text>
                                        }
                                    </View>

                                </View>}

                            </View>
                        ))}

                    </View>
                </View>



            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    noRequest: {
        fontSize: 25,
        color: "#8C8781",
        alignContent: "center",
        alignSelf: "center",
        marginTop: 50
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
        color: "black",
        fontSize: 22,
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
    container2: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#B2AAA9',
        borderRadius: 10,

        backgroundColor: "#8A8885",
        padding: 10,

    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 50,
        overflow: 'hidden',
    },

});

export default WokerDash;

