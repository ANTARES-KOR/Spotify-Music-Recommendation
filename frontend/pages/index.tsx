import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WebPlayback from "../components/WebPlayback";
import { useQuery } from "react-query";
import { fetchSongs, isTokenValid } from "../core/api/server";

const Home: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState();

  const checkToken = async () => {
    const access_token = localStorage.getItem("access_token");
    console.log(access_token)

    if (access_token==="undefined") {
      router.push("/login");
    }

    const valid = await isTokenValid(access_token);
    if (!valid) {
      router.push("/login");
    }
    setToken(JSON.parse(access_token));
    console.log("useState token", access_token);
  };

  const tokenQuery = useQuery("token", checkToken, { staleTime: 300000 });
  const songsQuery = useQuery(["songsQuery", token], () => fetchSongs(token), {
    staleTime: 600000,
  });

  useEffect(() => {
    checkToken();
  }, []);

  if (songsQuery.status === "loading" || tokenQuery.status === "loading") {
    return <span>Loading...</span>;
  }

  if (songsQuery.status === "error" || tokenQuery.status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return <WebPlayback data={songsQuery.data} token={token} />;
};

export default Home;
