import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchSongs, isTokenValid } from "../core/api/server";
import { useSetToken, useToken } from "../context/TokenContext";
import usePush from "../hooks/usePush";
import WebPlayback from "../components/WebPlayback";
import Loading from "../components/Loading";

const useCheckToken = () => {
  const token = useToken();
  const setToken = useSetToken();
  const push = usePush();
  useEffect(() => {
    if (token === null) {
      const savedToken = JSON.parse(localStorage.getItem("access_token")!);
      if (savedToken) {
        isTokenValid(savedToken).then((isValid) => {
          if (isValid) {
            setToken(savedToken);
          } else {
            push("/login");
          }
        });
      } else {
        push("/login");
      }
    } else {
      push("/");
    }
  }, [push, token, setToken]);
};

const Home: NextPage = () => {
  useCheckToken();
  const token = useToken();
  const router = useRouter();

  const songsQuery = useQuery(["songsQuery", token], () => fetchSongs(token), {
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
