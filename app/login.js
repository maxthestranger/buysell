import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import Button from "./components/button";
import Title from "./components/title";
import Paragraph from "./components/paragraph";
import Input from "./components/input";
import { loginUser } from "./dao";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError("");
    setGeneralError("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError("");
    setGeneralError("");
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    if (isValid) {
      // Perform login logic here
      loginUser(
        email,
        password,
        ({ success, user, message }) => {
          if (success) {
            // Login successful, check if user is vendor or buyer
            if(user.role === "vendor") {
              router.push("/vendor", { user }, { replace: true });
            } else {
              router.push("/home", { user }, { replace: true });
            }
            
          } else {
            // Login failed, display error message
            setGeneralError(message);
          }
        }
      );
    } else {
      setGeneralError("Please fix the errors below");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
    >
      <View style={styles.container}>
        <Image
          source={require(`./assets/small_logo.svg`)}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
          style={{ width: 59, height: 60 }}
        />
        <Title
          text="Sign in"
          extraStyles={{
            marginTop: 16,
            fontSize: 20,
            textAlign: "center",
          }}
        />
        <Paragraph
          text="Please provide details below to login to your account"
          extraStyles={{ marginTop: 33, textAlign: "center", maxWidth: 309 }}
        />
        {generalError ? (
          <Text style={styles.errorText}>{generalError}</Text>
        ) : null}
        <View style={{ marginTop: 69, width: "100%" }}>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="enter your email..."
              label="Email"
              onChangeText={handleEmailChange}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="enter your password"
              label="Password"
              onChangeText={handlePasswordChange}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
        </View>
        <View
          style={{
            marginTop: 72,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onPress={handleSubmit}
            title="Sign in"
            icon={{ name: "login", color: "#fff" }}
            extraStyle={{
              btn: { backgroundColor: "#000" },
              text: { color: "#fff" },
            }}
          />
        </View>
        <Text style={{ marginTop: 20 }}>
          Don't have an account?{" "}
          <Text style={{ color: "#91C63F", fontWeight: "bold" }}>
            <Link href="/register">Sign up</Link>
          </Text>
        </Text>
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
});
