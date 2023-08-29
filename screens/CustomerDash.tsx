import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';



function CustomerDash({ navigation, route }: any): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    const { logedUser } = route.params;

    function clickedCaterogy(selectedCategory) {

        navigation.navigate('AvailbleWorkers', { logedUser, selectedCategory });
    }

    return (
        <View>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={styles.appBar}>
                <Image style={styles.imgsIco} source={require('../assets/icons/home_c.png')} />
                <Image style={styles.imgsIco} source={require('../assets/icons/notification.png')} />
                <Image style={styles.imgsIco} source={require('../assets/icons/account.png')} />
            </View>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"

            >
                <View style={styles.outerContainer} >
                    {/* <Text>Cus = {logedUser.uname}</Text> */}
                    <View>
                        <TouchableOpacity onPress={ () => clickedCaterogy("Painter")}>
                            <View style={styles.container} >
                                <Image style={styles.imgs} source={require('../assets/catogeryImg/painter2.jpg')} />
                                <Text style={styles.cateTitle}>Painter</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => clickedCaterogy("Mower")}>
                        <View style={styles.container}>
                            <Image style={styles.imgs} source={require('../assets/catogeryImg/mower2.jpg')} />
                            <Text style={styles.cateTitle}>Mower</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => clickedCaterogy("Coconut plucker")}>
                        <View style={styles.container}>
                            <Image style={styles.imgs} source={require('../assets/catogeryImg/coconut_plucker2.jpg')} />
                            <Text style={styles.cateTitle}>Coconut plucker</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => clickedCaterogy("Plumber")}>
                        <View style={styles.container}>
                            <Image style={styles.imgs} source={require('../assets/catogeryImg/pulmber.jpg')} />
                            <Text style={styles.cateTitle}>Plumber</Text>
                        </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>


        </View>
    );
}
const styles = StyleSheet.create({

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
        marginBottom: 50
    },
    cateTitle: {
        color: "blue",
        fontSize: 20

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
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B2AAA9',
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,

    },

});

export default CustomerDash;