import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EndScreen({ navigation, route }) {
  const { gameOver } = route.params;

  return (
    <View style={styles.buttonContainer}>
      <Text>{gameOver}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.playAgainButton}
      >
        <Text style={styles.playAgainText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playAgainText: {
    color: "white",
    fontWeight: "bold",
  },
  playAgainButton: {
    marginTop: 10,
    backgroundColor: "black",
    height: 50,
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
