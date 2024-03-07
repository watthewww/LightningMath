import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  //function once start is pressed
  const pressStart = () => {
    //Target number
    const targetNumber = Math.floor(Math.random() * 899) + 100;

    //Random 6 numbers
    const largeNumbers = [25, 50, 75, 100];
    const smallNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randomLargeNumber1 =
      largeNumbers[Math.floor(Math.random() * largeNumbers.length)];
    const randomLargeNumber2 =
      largeNumbers[Math.floor(Math.random() * largeNumbers.length)];
    const randomSmallNumber1 =
      smallNumbers[Math.floor(Math.random() * smallNumbers.length)];
    const randomSmallNumber2 =
      smallNumbers[Math.floor(Math.random() * smallNumbers.length)];
    const randomSmallNumber3 =
      smallNumbers[Math.floor(Math.random() * smallNumbers.length)];
    const randomSmallNumber4 =
      smallNumbers[Math.floor(Math.random() * smallNumbers.length)];

    navigation.navigate("Game", {
      targetNumber: targetNumber,
      randomNumbersArray: [
        randomLargeNumber1,
        randomLargeNumber2,
        randomSmallNumber1,
        randomSmallNumber2,
        randomSmallNumber3,
        randomSmallNumber4,
      ],
    });
  };

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.titleText}>LightningMath</Text>
      <TouchableOpacity style={styles.startButton} onPress={() => pressStart()}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    top: 100,
  },
  startButton: {
    marginTop: 20,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
