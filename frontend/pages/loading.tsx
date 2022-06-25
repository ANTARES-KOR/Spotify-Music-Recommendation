import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../core/api/server";
import { useQueryClient } from "react-query";
import { useSetToken } from "../context/TokenContex";

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
        console.log("get token succeed", res);
        
        setToken(JSON.stringify(res.access_token))
        console.log("push to home");
        router.push("/");
        
      })
      .catch((err) => {
        console.log("get token failed", err);
      });
  }, [router,  current_code]);

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <h3
        css={css`
          font-size: 30px;
        `}
      >
        Loading...
      </h3>
      <img
        src="/loadingcat.gif"
        css={css`
          width: 400px;
        `}
      />
    </div>
  );
};

export default LoadingPage;
