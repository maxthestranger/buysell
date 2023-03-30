import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Title from "./components/title";

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
            marginTop: 21,
            width: "100%",
            gap: 17,
            alignItems: "center",
          }}
        >
          <View
            style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 30, backgroundColor: "#E0F0FE", borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <View>
              <Title text="Beauty" extraStyles={{ fontSize: 18 }} />
              <Title text="125 products" extraStyles={{ fontSize: 10 }} />
            </View>
            <Image
              source={require(`./assets/success.svg`)}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
              style={{ width: 81, height: 81 }}
            />
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
