import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Common from "../Components/Common";
import axios from "axios";
import { API_TOKEN } from "@env";

export default function Home() {
  const [feed, setFeed] = useState(null);
  const news = () => {
    axios({
      method: "get",
      url: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_TOKEN}`,
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
  }, []);

  return <Common feed={feed} text={"TOP HEADLINES"} />;
}
