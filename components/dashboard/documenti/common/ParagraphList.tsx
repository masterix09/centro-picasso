import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { FC } from "react";

const styles = StyleSheet.create({
  pointer: {
    width: 3,
    height: 3,
    backgroundColor: "black",
    borderRadius: "50%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    paddingLeft: 10,
    paddingTop: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: "normal",
  },
});

const ParagraphList: FC<{ text: string }> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pointer}></View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ParagraphList;
