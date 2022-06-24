import { useRouter } from "next/router";
import { css, jsx } from "@emotion/react";
import { requestLogin } from "../core/api/server";

const LoginPage = () => {
  const router = useRouter();

  const tmpToken =
    "BQDsTCOQ0MRDpmm3Yo768RL0XHIR7hkc5qLzvJqsVxC4aQwxeBO6yj7OacBj0YbtOScsf5mUsBicMBT0pcMFCShMQlBjs7EOFS474O5B1xg1PfyZ1aUlq2L79ys0wwgZ-e3lGJLdeXXd7Fo2sCmQHohjraDD4alVDTpRi5vfhHDZTM4WYrRRMXEMXyH8yfekkBnIrEiGAo9HPQrnhDc47qg7F9U";

  const onClick = () => {
    // localStorage.setItem("access_token", JSON.stringify(tmpToken));
    // router.replace("/");
    requestLogin()
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", JSON.stringify(res));
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div css={containerStyle}>
      <div css={logoStyle} />
      <h1 css={titleStyle}>Personal Music Recommendation System</h1>
      <button css={btnStyle} onClick={onClick}>
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
