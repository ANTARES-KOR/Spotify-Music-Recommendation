import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WebPlayback from "../components/WebPlayback";
import { useQuery } from "react-query";
import { fetchSongs, isTokenValid } from "../core/api/server";

const Home: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState();

  useEffect(() => {
    console.log("main page useeffect");
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      // if there is no access_token in localstorage, redirect to login page
      router.push("/login");
    }

    const validity = isTokenValid(access_token); // check the validity of access_token
    if (!validity) {
      router.push("/login");
    }
    setToken(JSON.parse(access_token));
  }, []);

  // fetch the recommended songs
  // const { status, data, error } = useQuery(["songs", token], () =>
  //   fetchSongs(token)
  // );
  const uris = [
    // temp data
    "spotify:track:7cDpMO5wuWgvv3j4INRBeB",
    "spotify:track:4ZaRg5Sf4TKr0YcFRLh7QJ",
    "spotify:track:7eCpXVlWnTVEE8twb3P8m5",
  ];

  // if (status === "loading") {
  //   return <span>Loading...</span>;
  // }

  // if (status === "error") {
  //   return <span>Error: {error.message}</span>;
  // }

  return <WebPlayback uris={uris} token={token} />;
};

export default Home;
