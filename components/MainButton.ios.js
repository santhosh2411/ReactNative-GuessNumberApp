import React from "react";
import {
    Text, StyleSheet, View, TouchableOpacity
} from "react-native";
import Colors from "../Constants/Colors";


const MainButton = props => {
 

    return (
            <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </TouchableOpacity>
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
   
})

export default MainButton;