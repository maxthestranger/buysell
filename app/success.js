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

  const handlePush = () => {
    const {user} = router.params;

    if(user.role === "vendor"){
      router.push({pathname: 'vendor', params: {user}});
    }else{
      router.push({pathname: 'home', params: {user}});
    }
  }
  
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
    >
      <View style={styles.container}>
        <Image
          source={require(`./assets/success.svg`)}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
          style={{ width: 151, height: 113 }}
        />
        <Title
          text="Successful!"
          extraStyles={{
            marginTop: 9,
            fontSize: 20,
            textAlign: "center",
          }}
        />
        <Paragraph
          text="You have successfully registered in out app happy shopping!"
          extraStyles={{ marginTop: 9, textAlign: "center", maxWidth: 290 }}
        />
        <View
          style={{
            marginTop: 140,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onPress={handlePush}
            title="Start shopping"
            icon={{ name: "shoppingcart", color: "#000" }}
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
