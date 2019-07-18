import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
export default class CalcDisplay extends Component {
  static defaultProps = {
    display: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.props.display}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  display: {
    // fontSize: this.props.display.length > 9 ? 50 : 70,
    fontSize: 50,
    color: "#fff",
    textAlign: "right"
  }
});
