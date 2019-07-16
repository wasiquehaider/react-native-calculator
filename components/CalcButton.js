import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class CalcButton extends Component {
  static defaultProps = {
    onPress: function() {},
    title: "",
    color: "#fff",
    backgroundColor: "#000",

    style: {}
  };
  render() {
    const bc = this.props.backgroundColor;
    const fontColor = this.props.fontColor;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.container,
          { backgroundColor: bc },
          { ...this.props.style }
        ]}
      >
        <Text style={[styles.text, { color: fontColor }]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5
  },
  text: { fontSize: 30, fontWeight: "bold" }
});
