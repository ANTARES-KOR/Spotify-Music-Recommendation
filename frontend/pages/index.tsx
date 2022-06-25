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
    if (token) {
      isTokenValid(token).then((isValid) => {
        if (!isValid) {
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

  return <WebPlayback />;
};

export default Home;
