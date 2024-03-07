import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function GameScreen({ navigation, route }) {
  const { targetNumber, randomNumbersArray } = route.params;

  const [equation, setEquation] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);

  //End game if the goal number is reached
  useEffect(() => {
    calculationOutput(equation) == targetNumber &&
      navigation.navigate("End", {
        gameOver: "You win!",
      });
  }, [equation]);

  //make an array of operators
  const operators = ["+", "-", "*", "/", "(", ")"];

  //function for key press
  const pressedKey = (value, index) => {
    const lastChar = equation.length > 0 ? equation[equation.length - 1] : "";
    if (
      (lastChar === "" && "+-*/".includes(value)) || // cannot start with operator
      (lastChar === "(" && "+-*/".includes(value)) || // cannot follow opening parenthesis with operator
      (lastChar === ")" && "(".includes(value)) || // cannot follow closing parenthesis with an opening parenthesis
      (typeof lastChar === "number" && typeof value === "number") || // cannot follow number with number
      (typeof lastChar === "number" && value === "(") // cannot follow number with opening parenthesis
    ) {
      // invalid key combination, do not update the input
      return;
    }
    setEquation([...equation, value]);
    setDisabledButtons([...disabledButtons, index]);
  };

  //function to show the current calculation output
  const calculationOutput = (equation) => {
    try {
      const value = equation.length == 0 ? "--" : eval(equation.join(""));
      return value;
    } catch (error) {
      return "--";
    }
  };

  //backspace function
  const pressedBackspace = () => {
    const newEquationArray = equation.slice(0, -1); // create a new array without the last equation item
    setEquation(newEquationArray); // update the state with the new equation array

    const newDisabledArray = disabledButtons.slice(0, -1); // create a new array without the last disabled item
    setDisabledButtons(newDisabledArray); // update the state with the new disabled array
  };

  //show the 6 random numbers
  const StyledRandomNumbersArray = (props) => {
    const text = ("" + props.text).split(",");
    return (
      <Text>
        {props.text.map((text, index) => {
          return (
            <View key={index} style={styles.randomNumbersArrayContainer}>
              <Text style={styles.randomNumbersArray}>{text}</Text>
            </View>
          );
        })}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <CountdownCircleTimer
          size={100}
          isPlaying
          duration={60}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() =>
            navigation.navigate("End", {
              gameOver: "You Lose!",
            })
          }
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
        <Text style={styles.targetNumber}>{targetNumber}</Text>
        <StyledRandomNumbersArray text={randomNumbersArray} />
        <View style={styles.liveEquation}>
          <Text style={styles.liveEquationText}>{equation.join(" ")}</Text>
        </View>
        <View style={styles.liveValue}>
          <Text style={styles.currentValue}>Current Value: </Text>
          <Text>{calculationOutput(equation)}</Text>
        </View>
        <View //keyboard
          style={styles.keyboardContainer}
        >
          <View style={styles.keyboardLeft}>
            <View style={styles.keyboardButtonRows}>
              {randomNumbersArray.slice(0, 2).map((number, index) => {
                return (
                  <TouchableOpacity
                    disabled={disabledButtons.includes(index)}
                    onPress={() => pressedKey(number, index)}
                    style={
                      disabledButtons.includes(index)
                        ? styles.disabledButton
                        : styles.keyButton
                    }
                    key={index}
                  >
                    <Text style={styles.keyButtonText}>{number}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.keyboardButtonRows}>
              {randomNumbersArray.slice(2, 4).map((number, index) => {
                return (
                  <TouchableOpacity
                    disabled={disabledButtons.includes(index + 2)}
                    onPress={() => pressedKey(number, index + 2)}
                    style={
                      disabledButtons.includes(index + 2)
                        ? styles.disabledButton
                        : styles.keyButton
                    }
                    key={index}
                  >
                    <Text style={styles.keyButtonText}>{number}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.keyboardButtonRows}>
              {randomNumbersArray.slice(4, 6).map((number, index) => {
                return (
                  <TouchableOpacity
                    disabled={disabledButtons.includes(index + 4)}
                    onPress={() => pressedKey(number, index + 4)}
                    style={
                      disabledButtons.includes(index + 4)
                        ? styles.disabledButton
                        : styles.keyButton
                    }
                    key={index}
                  >
                    <Text style={styles.keyButtonText}>{number}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.keyboardRight}>
            <View style={styles.keyboardButtonRows}>
              {operators.slice(0, 2).map((operator, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => pressedKey(operator)}
                    style={styles.keyButton}
                    key={index}
                  >
                    <Text style={styles.keyButtonText}>{operator}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.keyboardButtonRows}>
              {operators.slice(2, 4).map((operator, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => pressedKey(operator)}
                    style={styles.keyButton}
                    key={index}
                  >
                    <Text style={styles.keyButtonText}>{operator}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.keyboardButtonRows}>
              {operators.slice(4, 6).map((operator, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => pressedKey(operator)}
                    style={styles.keyButton}
                    key={index}
                  >
                    <Text style={styles.keyButtonText}>{operator}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <View //bottom buttons
          style={styles.bottomButtons}
        >
          <TouchableOpacity //backspace
            onPress={() => pressedBackspace()}
            style={styles.backspace}
          >
            <Text style={styles.backspaceText}>Backspace</Text>
          </TouchableOpacity>
          <TouchableOpacity //clear
            onPress={() => (setEquation([]), setDisabledButtons([]))}
            style={styles.clear}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: "row",
  },
  clearText: {
    color: "red",
    fontWeight: "bold",
  },
  backspaceText: {
    color: "white",
    fontWeight: "bold",
  },
  backspace: {
    marginTop: 20,
    width: "35%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  clear: {
    marginTop: 20,
    width: "35%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  keyButtonText: {
    fontSize: 20,
  },
  keyButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "grey",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardButtonRows: {
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "33%",
  },
  keyboardContainer: {
    height: "30%",
    width: "90%",
    flexDirection: "row",
  },
  keyboardLeft: {
    height: "100%",
    width: "50%",
    backgroundColor: "lightgrey",
  },
  keyboardRight: {
    height: "100%",
    width: "50%",
    backgroundColor: "lightgrey",
  },
  liveEquation: {
    width: "90%",
    height: "20%",
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 15,
  },
  liveEquationText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  liveValue: {
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    height: 40,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginVertical: 10,
    flexDirection: "row",
  },
  currentValue: {
    fontWeight: "bold",
    paddingRight: 10,
  },
  randomNumbersArray: {
    fontSize: 20,
  },
  randomNumbersArrayContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
  },
  targetNumber: {
    paddingVertical: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  safeAreaView: {
    backgroundColor: "white",
  },
  container: {
    paddingTop: 50,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
