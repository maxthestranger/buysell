import { StyleSheet, Text, View } from "react-native";
import Button from "./components/button";
import Input from "./components/input";
import Paragraph from "./components/paragraph";
import Title from "./components/title";
import TopBar from "./components/topBar";

export default function Page() {
  function handleClick() {
    alert("You clicked the button!");
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
      <Button
        title="sign in"
        icon={{ name: "login-variant", color: "#fff" }}
        extraStyle={{
          btn: { backgroundColor: "#000" },
          text: { color: "#fff" },
        }}
        onPress={handleClick}
      />
      <View style={{ width: "100%" }}>
        <Input placeholder="enter your email..." label="email" />
      </View>
      <Paragraph
        text="Get a little lift from these Sam Edelman sandals featuring ruched straps and leather lace-up ties, while a braided jute sole makes a fresh statement for summer."
        extraStyles={{ marginVertical: 10, textAlign: "center" }}
      />
      <Title text="Roller Rabbit" extraStyles={{ textAlign: "center", fontSize: 18 }} />
      <TopBar title="home" initials="GK" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
