import React, { useCallback, useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {StatusBar} from "expo-status-bar";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function App() {
    const [fontsLoaded] = useFonts({
        'Poppins': 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    });
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync(Entypo.font);
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', maxWidth: 238 }}>
                <Image
                    source={require('../assets/logo.svg')}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                    style={styles.image}
                />
                <Text style={styles.h1}>BuySell</Text>
                <Text style={styles.p}>A Comprehensive Solution for Community-Based Selling and Buying of Products</Text>
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
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
        marginTop: 11,
        fontWeight: 'bold',
    },
    p: {
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 9,
        fontWeight: 'normal',
    },
    image: {
        width: 96,
        height: 98,
    },
});