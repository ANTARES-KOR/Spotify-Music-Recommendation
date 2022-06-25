import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import WebPlayback from "../components/WebPlayback";
import { useQuery } from "react-query";
import { fetchSample, fetchSongs, isTokenValid } from "../core/api/server";
import { useSetToken, useToken } from "../context/TokenContex";

const useCheckToken = () => {
  const token = useToken();
  const setToken = useSetToken();
  const router = useRouter();

  useEffect(() => {
    console.log("token", token);
    if (token) {
      console.log("token", token);
      isTokenValid(token).then((isValid) => {
        console.log(isValid)
        if (!isValid) {
          console.log("set token to null")
          setToken(null);
          router.push("/login");
        }
      });
    } else {
      router.push("/login");
    }
  }, [router, setToken, token]);
};

const Home: NextPage = () => {
  useCheckToken();
  const token = useToken();
  const router = useRouter();

  const songsQuery = useQuery(["songsQuery", token], () => fetchSongs(token), {
     onError:(err)=>{
      console.log("onError", err);
      router.push('/filter')
    },
  });

  if (songsQuery.status === "loading") {
    return <span>Loading...</span>;
  }

  if (songsQuery.status === "error") {
    return <span>Error</span>;
  }

  return <WebPlayback data={songsQuery.data} />;
};

export default Home;
