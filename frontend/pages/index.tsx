import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import WebPlayback from "../components/WebPlayback";
import { useQuery } from "react-query";
import { fetchSongs, isTokenValid } from "../core/api/server";
import { useSetToken, useToken } from "../context/TokenContext";
import Loading from "../components/Loading";

const useCheckToken = () => {
  const token = useToken();
  const setToken = useSetToken();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setToken(JSON.parse(localStorage.getItem("access_token") || "{}"));
    }
    if (token) {
      isTokenValid(token).then((isValid) => {
        if (!isValid) {
          setToken(null);
          router.push("/login");
        } else {
          router.push("/");
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
    onSuccess: () => {
      console.log(songsQuery.data);
    },
    onError: (err) => {
      router.push("/filter");
    },
  });

  if (songsQuery.status === "loading") {
    return <Loading />;
  }

  if (songsQuery.status === "error") {
    return <span>Error</span>;
  }

  return <WebPlayback data={songsQuery.data} />;
};

export default Home;
