import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';


function AvailbleWorkers({ navigation, route }: any): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const { logedUser, selectedCategory } = route.params;
    return (
        <View>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={styles.appBar}>
                <Image style={styles.imgsIco} source={require('../../assets/icons/home_c.png')} />
                <Image style={styles.imgsIco} source={require('../../assets/icons/notification.png')} />
                <Image style={styles.imgsIco} source={require('../../assets/icons/account.png')} />
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"

            >
                <View style={styles.outerContainer} >
                    <Text style={styles.cateTitle} >{selectedCategory}</Text>
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
        marginBottom: 50,
        padding:25
    },
    cateTitle: {
        color: "blue",
        fontSize: 20,
        fontWeight:"bold"

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

export default AvailbleWorkers;