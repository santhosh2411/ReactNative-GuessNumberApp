import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import colors from "../Constants/Colors";
import TitleText from './TitleText'

const Header = props => {
    return (
        <View
            style={{
                ...styles.headerBase,
                ...Platform.select({
                    ios: styles.headerIos,
                    android: styles.headerAndroid
                })
            }}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>)
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerIos: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white'
    },
    headerAndroid: {
        backgroundColor: colors.accent
    },

    title: {
        color: Platform.OS === "ios" ? colors.accent : 'white',
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }

})

export default Header;