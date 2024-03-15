import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { FC, ReactNode } from "react";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const Paragraph: FC<{
  title: string;
  children: ReactNode;
}> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default Paragraph;
