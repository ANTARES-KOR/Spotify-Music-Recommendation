import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../core/api/server";
import { useQueryClient } from "react-query";
import { useSetToken } from "../context/TokenContext";
import Loading from "../components/Loading";

const LoadingPage = () => {
  const router = useRouter();
  const [current_code, setCode] = useState("");
  const setToken = useSetToken();

  useEffect(() => {
    const code = router.asPath.split("code=")[1];
    setCode(code);
    if (code === current_code) {
      router.push("/");
      return;
    }
    getToken(code)
      .then((res) => {
        setToken(JSON.stringify(res.access_token));
        router.push("/");
      })
      .catch((err) => {
        console.log("get token failed", err);
      });
  }, [router, current_code]);

  return <Loading />;
};

export default LoadingPage;
