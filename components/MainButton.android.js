import React from "react";
import {
    Text, StyleSheet, View, TouchableOpacity, Platform,
    TouchableNativeFeedback,
} from "react-native";
import Colors from "../Constants/Colors";


const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent onPress={props.onPress} activeOpacity={0.6}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    },
    buttonContainer:
    {
        borderRadius:25,
        overflow:'hidden'
    }
})

export default MainButton;