import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { initDatabase } from "./db";
import Button from "./components/button";
import Title from "./components/title";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    initDatabase();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
    >
      <View style={styles.container}>
        <Image
          source={require(`./assets/welcome.svg`)}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
          style={{ width: 234, height: 162 }}
        />
        <Title
          text="Welcome To The USA’s Most Imaginative Online Marketplace"
          extraStyles={{
            marginTop: 41,
            fontSize: 16,
            textAlign: "center",
            maxWidth: 230,
          }}
        />
        <View
          style={{
            marginTop: 140,
            flex: 1,
            gap: 15,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onPress={() => {
              router.push("/login");
            }}
            title="Sign in"
            icon={{ name: "login", color: "#fff" }}
            extraStyle={{
              btn: { backgroundColor: "#000" },
              text: { color: "#fff" },
            }}
          />
          <Button
            onPress={() => {
              router.push("/register");
            }}
            title="Sign up"
            icon={{ name: "adduser", color: "#000" }}
            extraStyle={{
              btn: {
                backgroundColor: "#fff",
                borderColor: "#000",
                borderWidth: 1,
                borderStyle: "solid",
              },
              text: { color: "#000" },
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
    marginBottom: 57,
  },
});
