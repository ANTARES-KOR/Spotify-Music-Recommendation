import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../core/api/server";
import { useQueryClient } from "react-query";

const LoadingPage = () => {
  const router = useRouter();
  const [current_code, setCode] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const code = router.asPath.split("code=")[1];
    setCode(code);
    console.log("useeffect of loadingpage");
    console.log(code);
    // console.log("get code succeed", code);
    if (code === current_code) {
      router.push("/");
      return;
    }
    getToken(code)
      .then((res) => {
        console.log("get token succeed", res);
        localStorage.setItem("access_token", JSON.stringify(res.access_token));
        router.push("/");
        queryClient.invalidateQueries("token"); // 기존 캐시를 무효화 -> 새로 가져오기
      })
      .catch((err) => {
        console.log("get token failed", err);
      });
  }, [router, queryClient, current_code]);

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
