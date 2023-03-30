import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Button from "./components/button";
import Title from "./components/title";
import Paragraph from "./components/paragraph";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Success() {
  const router = useRouter();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
    >
      <View style={styles.container}>
        <View
          style={{
            marginTop: 26,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onPress={() => {
              router.push("/add_product");
            }}
            title="Add Product"
            icon={{ name: "shoppingcart", color: "#fff" }}
            extraStyle={{
              btn: {
                backgroundColor: "#000",
              },
              text: { color: "#fff" },
            }}
          />
        </View>
        <View
          style={{
            marginTop: 37,
            width: "100%",
            gap: 29,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={require(`./assets/welcome.svg`)}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
              style={{ width: 80, height: 81 }}
            />
            <View>
              <Title
                text="Roller Rabbit"
                extraStyles={{
                  fontSize: 16,
                }}
              />
              <Paragraph
                text="Vado Odelle Dress"
              />
              <Title
                text="$19.00"
                extraStyles={{
                  marginTop: 10,
                  fontSize: 14,
                }}
              />
            </View>
          </View>
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
