import { css, jsx } from "@emotion/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "../core/api/server";

const LoadingPage = () => {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
    const [code] = router.query.params;
    console.log("get code succeed", code);
    getToken(code)
      .then((res) => {
        console.log("get token succeed", res);
      })
      .catch((err) => {
        console.log("get token failed", err);
      });
  }, []);
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
