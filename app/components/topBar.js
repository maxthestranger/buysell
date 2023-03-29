import { StyleSheet, View, Text } from "react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Feather } from "@expo/vector-icons";

export default function TopBar({ initials, title }) {
  // Load fonts
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.bar}>
      <View style={styles.backButton}>
        <Feather name="arrow-left" size={18} color="#fff" />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.gk}>
        <Text style={styles.gkText}>{initials}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  backButton: {
    backgroundColor: "#000",
    width: 35,
    height: 35,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#000",
    textTransform: "capitalize",
    fontFamily: "Poppins_700Bold",
  },
  gk: {
    backgroundColor: "#ddd",
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gkText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: "Poppins_700Bold",
  },
});
