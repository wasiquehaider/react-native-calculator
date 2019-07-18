import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

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
        {this.props.iconName ? (
          <Icon name={this.props.iconName} size={30} color={fontColor} />
        ) : (
          <Text style={[styles.text, { color: fontColor }]}>
            {this.props.title}
          </Text>
        )}
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
  text: { fontSize: 35, fontWeight: "bold" }
});
