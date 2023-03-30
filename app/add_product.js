import { ScrollView, StyleSheet, Text, View } from "react-native";
import Picker from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import Button from "./components/button";
import Input from "./components/input";
import { createProduct, getCategories } from "./dao";
import * as ImagePicker from "expo-image-picker";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function AddProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [categories, setCategories] = useState([]);

  const handleNameChange = (value) => {
    setName(value);
    setNameError("");
    setGeneralError("");
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    setPriceError("");
    setGeneralError("");
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setDescriptionError("");
    setGeneralError("");
  };

  const handleImageChange = async (value) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const handleCategoryChange = (value) => {
      setCategory(value);
      setCategoryError("");
      setGeneralError("");
    };

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setImageError("");
    setGeneralError("");
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!price.trim()) {
      setPriceError("Price is required");
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }

    if (!image.trim()) {
      setImageError("Image is required");
      isValid = false;
    }

    if (!category.trim()) {
      setCategoryError("Category is required");
      isValid = false;
    }

    if (isValid) {
      // Perform login logic here
      createProduct(
        name,
        userId,
        price,
        description,
        status,
        image,
        category,
        ({ success, user, message }) => {
          if (success) {
            // Registration successful, redirect to home page
            router.push("/success", { user }, { replace: true });
          } else {
            // Registration failed, show error message
            setGeneralError(message);
          }
        }
      );
    } else {
      setGeneralError("Please fix the errors below");
    }
  };

  useEffect(() => {
    getCategories(({ success, categories, message }) => {
      if (success) {
        setCategories(categories);
      }
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
    >
      <View style={styles.container}>
        {generalError ? (
          <Text style={styles.errorText}>{generalError}</Text>
        ) : null}
        <View style={{ marginTop: 20, width: "100%" }}>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="enter product name..."
              label="Name"
              onChangeText={handleNameChange}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="enter product price"
              label="Price"
              onChangeText={handlePriceChange}
            />
            {priceError ? (
              <Text style={styles.errorText}>{priceError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="enter description..."
              label="Description"
              onChangeText={handleDescriptionChange}
            />
            {descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Image</Text>
            <Button
              onPress={handleImageChange}
              title="Pick an image"
              icon={{ name: "picture", color: "#000" }}
              extraStyle={{
                btn: { backgroundColor: "#f2f2f2", borderRadius: 10 },
                text: { color: "#000" },
              }}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            {descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Category</Text>
            <Picker
              selectedValue={category}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              {categories.map((category) => (
                <Picker.Item label={category?.name} value={category?.id} />
              ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            marginTop: 31,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onPress={handleSubmit}
            title="Save"
            icon={{ name: "shoppingcart", color: "#fff" }}
            extraStyle={{
              btn: { backgroundColor: "#000" },
              text: { color: "#fff" },
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
  errorText: {
    color: "red",
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 700,
    color: "#000",
    marginBottom: 10,
    textTransform: "capitalize",
    fontFamily: "Poppins_700Bold",
  },
});
