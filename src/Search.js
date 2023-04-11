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
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { API_TOKEN } from "@env";
//import LinearGradient from "expo-linear-gradient";

export default function Search() {
  const [feed, setFeed] = useState(null);
  const [search, SetSearch] = useState("");
  const news = () => {
    let url;
    if (search === "") {
      url = `https://newsapi.org/v2/everything?q=relevance&apiKey=${API_TOKEN}`;
    } else {
      url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_TOKEN}`;
    }
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        setFeed(res.data.articles);
        console.log("Home ");
        //console.log(res.data.articles[0].source.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    news();
  }, [search]);

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
          <TextInput
            style={styles.address}
            placeholder="Search"
            mode="outlined"
            outlineColor="black"
            activeOutlineColor="black"
            placeholderTextColor={"black"}
            value={search}
            theme={{ roundness: 18 }}
            onChangeText={(value) => SetSearch(value)}
          />
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
            keyExtractor={(item, index) => item.publishedAt}
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
  address: {
    //position: "relative",
    width: "90%",
    height: 40,
    backgroundColor: "gray",
    top: -5,
    left: 15,
    alignContent: "center",
  },
});
