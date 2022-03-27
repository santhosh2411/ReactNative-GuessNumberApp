import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../Constants/default-styles";
import MainButton from "../components/MainButton";
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';


const generateRandomNumberBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomNumberBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }
}

const renderListItem = (listLength, itemData) =>
(<View style={styles.listItem}>

    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>

</View>)

const GameScreen = props => {

    const intialGuess = generateRandomNumberBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(intialGuess);
    const [pastGuesses, setPastGuesses] = useState([intialGuess.toString()]);
    const currentLow = useRef(1);
    const CurrentHigh = useRef(100);
    const { onGameOver, userChoice } = props;
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

useEffect (()=>{

    const updateLayout= () => {
        setAvailableDeviceWidth(Dimensions.get('window').width);
        setAvailableDeviceHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener('change', updateLayout)

    return () => {
        Dimensions.addEventListener('change', updateLayout)
    }
})

    useEffect(() => {
        if (currentGuess == userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, onGameOver, userChoice])

    const nextGuessHandler = direction => {

        if
            ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'You know the Text is Wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            CurrentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomNumberBetween(currentLow.current, CurrentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }
    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Oppenent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color='white' />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color='white' />
                    </MainButton>
                </View>

                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
        </ScrollView> */}
                    <FlatList contentContainerStyle={styles.list}
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Oppenent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color='white' />
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList contentContainerStyle={styles.list}
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    screen:
    {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listContainer:
    {
        flex: 1,
        width: '60%'
    },
    listContainerBig:
    {
        flex: 1,
        width: '80%'
    },
    controls:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },
    list:
    {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem:
    {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
})

export default GameScreen;