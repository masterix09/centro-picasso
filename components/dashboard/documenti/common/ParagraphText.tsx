import { StyleSheet, Text } from "@react-pdf/renderer";
import React, { FC } from "react";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    fontSize: 10,
    fontWeight: "normal",
  },
  containerWithoutMargin: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 10,
    fontWeight: "normal",
  },
});

const ParagraphText: FC<{ text: string; withoutMarginTop?: boolean }> = ({
  text,
  withoutMarginTop = false,
}) => {
  return !withoutMarginTop ? (
    <Text style={styles.container}>{text}</Text>
  ) : (
    <Text style={styles.containerWithoutMargin}>{text}</Text>
  );
};

export default ParagraphText;
