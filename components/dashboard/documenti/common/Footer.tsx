import { View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sx: {
    width: "45%",
  },
  dx: {
    width: "45%",
  },
  firma: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginTop: 50,
  },
  text: {
    fontSize: 12,
    marginTop: 10,
  },
});

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sx}>
        <Text style={styles.text}>Firma dell’Odontoiatra </Text>
        <Text style={styles.text}>Dott. Antonio Cancelliere </Text>
      </View>
      <View style={styles.dx}>
        <Text style={styles.text}>
          Firma del Paziente o del genitore se minorenne
        </Text>
        <View style={styles.firma}></View>
      </View>
    </View>
  );
};

export default Footer;
