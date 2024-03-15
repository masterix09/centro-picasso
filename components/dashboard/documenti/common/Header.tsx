import React from "react";
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  conatiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  sx: {
    width: "45%",
  },
  dx: {
    width: "45%",
    textAlign: "right",
  },
  text: {
    color: "grey",
    fontSize: 10,
  },

  image: {
    width: 180,
    height: 40,
  },
});
const Header = () => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.sx}>
        <Image src="/images/Centro_Picasso_Logotipo.png" style={styles.image} />
        <Text style={styles.text}>
          Studio Dentistico Dott. Antonio Cancelliere
        </Text>
      </View>
      <View style={styles.dx}>
        <Text style={styles.text}>Via Picasso snc</Text>
        <Text style={styles.text}>80029 Sant&apos;Antimo (NA)</Text>
        <Text style={styles.text}>Tel: 3895890052</Text>
      </View>
    </View>
  );
};

export default Header;
