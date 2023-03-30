import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import Button from "./components/button";
import Title from "./components/title";
import Paragraph from "./components/paragraph";
import Input from "./components/input";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { registerUser } from "./dao";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Login() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [comfirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [generalError, setGeneralError] = useState("");

  // Load fonts
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

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

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setRoleError("");
    setGeneralError("");
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setConfirmPasswordError("");
    setGeneralError("");
  };

  const handleNameChange = (value) => {
    setName(value);
    setNameError("");
    setGeneralError("");
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setPhoneError("");
    setGeneralError("");
  };

  const handleAddressChange = (value) => {
    setAddress(value);
    setAddressError("");
    setGeneralError("");
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!selectedRole) {
      setRoleError("Role is required");
      isValid = false;
    }

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

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters long");
      isValid = false;
    }

    if (!phone.trim()) {
      setPhoneError("Phone is required");
      isValid = false;
    } else if (phone.length < 10 || parseInt(phone) === NaN) {
      setPhoneError("Phone must be at least 10 characters long");
      isValid = false;
    }

    if (!address.trim()) {
      setAddressError("Address is required");
      isValid = false;
    }

    if (isValid) {
      // Perform login logic here
      registerUser(
        name,
        selectedRole,
        phone,
        email,
        address,
        password,
        ({ success, user, message }) => {
          if (success) {
            // Registration successful, redirect to home page
            router.push({pathname: "/success", params: {user}});
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
          style={{ width: 59, height: 60, marginTop: 64 }}
        />
        <Title
          text="Sign up"
          extraStyles={{
            marginTop: 16,
            fontSize: 20,
            textAlign: "center",
          }}
        />
        <Paragraph
          text="Please provide details below to create an account with us"
          extraStyles={{ marginTop: 19, textAlign: "center", maxWidth: 309 }}
        />
        {generalError ? (
          <Text style={styles.errorText}>{generalError}</Text>
        ) : null}
        <View style={{ marginTop: 20, width: "100%" }}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.label}>Role</Text>
            <RadioButton.Group
              onValueChange={handleRoleChange}
              value={selectedRole}
            >
              <View style={styles.radioGroup}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android value="buyer" color="#007AFF" />
                  <Text style={styles.radioButtonLabel}>Buyer</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android value="vendor" color="#007AFF" />
                  <Text style={styles.radioButtonLabel}>Vendor</Text>
                </View>
              </View>
            </RadioButton.Group>
            {roleError ? (
              <Text style={styles.errorText}>{roleError}</Text>
            ) : null}
          </View>
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
              placeholder="enter your name..."
              label="Name"
              onChangeText={handleNameChange}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="enter your phone..."
              label="Phone"
              onChangeText={handlePhoneChange}
            />
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="enter your address..."
              label="Address"
              onChangeText={handleAddressChange}
            />
            {addressError ? (
              <Text style={styles.errorText}>{addressError}</Text>
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
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="confirm your password"
              label="Confirm Password"
              onChangeText={handleConfirmPasswordChange}
            />
            {comfirmPasswordError ? (
              <Text style={styles.errorText}>{comfirmPasswordError}</Text>
            ) : null}
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
            title="Sign up"
            icon={{ name: "adduser", color: "#fff" }}
            extraStyle={{
              btn: { backgroundColor: "#000" },
              text: { color: "#fff" },
            }}
          />
        </View>
        <Text style={{ marginTop: 20 }}>
          Already have an account?{" "}
          <Text style={{ color: "#91C63F", fontWeight: "bold" }}>
            <Link href="/login">Sign in</Link>
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
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    minWidth: "45%",
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 8,
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
