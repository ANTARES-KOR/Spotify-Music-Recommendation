import { useRouter } from "next/router";
import { css, jsx } from "@emotion/react";

const LoginPage = () => {
  const router = useRouter();

  // const tmpToken =
  //   "BQAKRQR_4XRpRkcmNVY4me5dGZGDL3ZDYCnhWuRMGJ7tjnGPTQTd7CrdW5jmXLEx7H_xPdYgfKLGrXCfBeroFvbA8tqfRH-cZczRM-rl2XEyiGZSGXR8QPU1qZtkYGjwiGDtju9D8yW6D3l30dqs75hKEdTEgpnTwnkmir8fQM4ceoxcijd0gP7xAwIGw5ylusIWZZCo26we83JUoQVId4EXG-8";

  const onClick = () => {
    fetch("/api/login")
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", JSON.stringify(tmpToken));
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1 css={titleStyle}>Welcome to</h1>
      <h1 css={titleStyle}>Spotify Music Recommendation</h1>
      <button onClick={onClick}>Log in Spotify</button>
    </>
  );
};

export default LoginPage;

const titleStyle = css`
  font-size: 60px;
`;
