import { StatusBar } from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Welcome() {

    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/welcome.png')}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                style={styles.image}
            />
            <Text style={styles.h1}>Welcome To The USA’s Most Imaginative Online Marketplace</Text>
            <View
                style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}
            >
                <Pressable
                    style={[styles.button, { backgroundColor: "#000" }]}
                    onPress={() => alert('You pressed a login button.')}
                >
                    <MaterialCommunityIcons
                        name="login-variant"
                        size={18}
                        color="#fff"
                        style={styles.buttonIcon}
                    />
                    <Text style={[styles.buttonLabel, { color: "#fff" }]}>Sign in</Text>
                </Pressable>
            </View>
            <View
                style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}
            >
                <Pressable
                    style={[styles.button, { backgroundColor: "#fff" }]}
                    onPress={() => alert('You pressed sign up button.')}
                >
                    <Feather
                        name="user-plus"
                        size={18}
                        color="#000"
                        style={styles.buttonIcon}
                    />
                    <Text style={[styles.buttonLabel, { color: "#000" }]}>Sign up</Text>
                </Pressable>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 11,
    fontWeight: 700,
      maxWidth: 247,
  },
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginTop: 140,
    },
    button: {
        borderRadius: 30,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        outline: 'none',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
    register: {
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        paddingTop: 17,
        paddingBottom: 17,
        borderRadius: 30,
        marginBottom: 15,
        width: '100%',
    },
    image: {
        width: 334,
        height: 263,
    },
});
