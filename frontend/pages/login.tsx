import { useRouter } from "next/router";
import { css, jsx } from "@emotion/react";
import { requestLogin } from "../core/api/server";

const LoginPage = () => {
  return (
    <div css={containerStyle}>
      <div css={logoStyle} />
      <h1 css={titleStyle}>Personal Music Recommendation System</h1>
      <button
        css={btnStyle}
        onClick={() => {
          requestLogin();
        }}
      >
        Log in with Spotify
      </button>
    </div>
  );
};

export default LoginPage;

const containerStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("./bgImg.jpeg");
  background-size: cover;
`;

const logoStyle = css`
  background-image: url("./logo.png");
  width: 792px;
  height: 233px;
`;
const titleStyle = css`
  font-size: 40px;
  color: #375571;
  margin-bottom: 120px;
`;

const btnStyle = css`
  width: 289px;
  height: 88px;
  background: #65d36e;
  box-shadow: 0px 4px 9px #00000029;
  border-radius: 60px;
  border: none;
  font-size: 26px;
  color: #121212;
`;
