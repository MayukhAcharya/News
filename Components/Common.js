import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
//import LinearGradient from "expo-linear-gradient";

export default function Common({ feed, text }) {
  const [refresh, SetRefresh] = useState(false);
  const [loaded] = useFonts({
    LibreBodoni: require("../assets/fonts/LibreBodoni.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const OpenUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      alert("Invalid Url");
    }
  };

  return (
    <View style={styles.container}>
      {feed === null ? (
        <ActivityIndicator size={"large"} color={"white"} />
      ) : (
        <View style={{ width: "100%", marginTop: 50 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              alignItems: "center",
              bottom: 15,
              fontFamily: "serif",
              left: 30,
            }}
          >
            {text}
          </Text>
          <FlatList
            data={feed?.slice(0, 20)}
            renderItem={({ item, index }) => (
              <View style={styles.postview}>
                <TouchableOpacity onPress={() => OpenUrl(item.url)}>
                  <ImageBackground
                    source={{
                      uri:
                        item.urlToImage ||
                        "https://www.relianceorthodontics.com/scs/extensions/SC/Manor/3.3.0/img/no_image_available.jpeg",
                    }}
                    style={styles.Images}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 20 }}
                  >
                    <LinearGradient
                      colors={["#00000000", "#000000"]}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <Text style={styles.TitleText} numberOfLines={2}>
                        {item.title}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => item.url}
          />
        </View>
      )}
      <StatusBar animated={true} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  postview: {},
  TextView: {
    margin: 5,
    left: 150,
    top: 60,
  },
  Images: {
    height: 200,
    width: 350,
    marginTop: 30,
    left: 20,
  },
  TitleText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "LibreBodoni",
    top: 140,
    left: 5,
  },
});
