require("../libs/swisscalc.lib.format.js");
require("../libs/swisscalc.lib.operator.js");
require("../libs/swisscalc.lib.operatorCache.js");
require("../libs/swisscalc.lib.shuntingYard.js");
require("../libs/swisscalc.calc.calculator.js");
require("../libs/swisscalc.display.numericDisplay.js");
require("../libs/swisscalc.display.memoryDisplay.js");
import React, { Component } from "react";
import { Text, StyleSheet, View, PanResponder, Dimensions } from "react-native";
import { CalcButton, CalcDisplay } from "../components/index.js";

export default class CalculatorScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      orientation: "portrait"
    };
    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();

    // check for orientation change
    Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("window");
      const orientation = width > height ? "landscape" : "portrait";
      this.setState({ orientation: orientation });
    });

    // Initialize Panresponder
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackspacePress();
        }
      }
    });
  }

  // called when a digit is passed
  onDigitPress = digit => {
    this.calc.addDigit(digit);
    this.setState({ display: this.calc.getMainDisplay() });
  };
  onBinaryOperatorPress = operator => {
    this.calc.addBinaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  };
  onUnaryOperatorPress = operator => {
    this.calc.addUnaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onClearPress = () => {
    this.calc.clear();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onPlusMinus = () => {
    this.calc.negate();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onEqualsPress = () => {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  };
  onBackspacePress = () => {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  renderPortrait = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={styles.displayContainer}
          {...this.panResponder.panHandlers}
        >
          <CalcDisplay display={this.state.display} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={this.onClearPress}
              title="C"
              fontColor="#fff"
              backgroundColor="#D4A065"
            />
            <CalcButton
              onPress={this.onPlusMinus}
              title="+/-"
              fontColor="#fff"
              backgroundColor="#D4A065"
            />
            <CalcButton
              onPress={() => this.onUnaryOperatorPress(this.oc.PercentOperator)}
              title="%"
              fontColor="#fff"
              backgroundColor="#D4A065"
            />
            <CalcButton
              onPress={() =>
                this.onBinaryOperatorPress(this.oc.DivisionOperator)
              }
              title="/"
              fontColor="#fff"
              backgroundColor="#265B6A"
            />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("7");
              }}
              title="7"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("8");
              }}
              title="8"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              title="9"
              onPress={() => {
                this.onDigitPress("9");
              }}
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() =>
                this.onBinaryOperatorPress(this.oc.MultiplicationOperator)
              }
              title="x"
              fontColor="#fff"
              backgroundColor="#265B6A"
            />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("4");
              }}
              title="4"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("5");
              }}
              title="5"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("6");
              }}
              title="6"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() =>
                this.onBinaryOperatorPress(this.oc.SubtractionOperator)
              }
              title="-"
              fontColor="#fff"
              backgroundColor="#265B6A"
            />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("1");
              }}
              title="1"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("2");
              }}
              title="2"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("3");
              }}
              title="3"
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={() =>
                this.onBinaryOperatorPress(this.oc.AdditionOperator)
              }
              title="+"
              fontColor="#fff"
              backgroundColor="#265B6A"
            />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("0");
              }}
              title="0"
              fontColor="#fff"
              backgroundColor="#A3C584"
              style={{ flex: 2 }}
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress(".");
              }}
              title="."
              fontColor="#fff"
              backgroundColor="#A3C584"
            />
            <CalcButton
              onPress={this.onEqualsPress}
              title="="
              fontColor="#fff"
              backgroundColor="#265B6A"
            />
          </View>
        </View>
      </View>
    );
  };

  renderLandscape = () => {
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "#fff" }}>Landscape Mode</Text>
    </View>;
  };

  render() {
    var view =
      this.state.orientation == "portrait"
        ? this.renderPortrait()
        : this.renderLandscape();

    return <View style={styles.container}>{view}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  buttonContainer: {
    paddingBottom: 20
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" }
});
