import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import CalculatorScreen from "./screens/CalculatorScreen";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CalculatorScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { flex: 1 } });
