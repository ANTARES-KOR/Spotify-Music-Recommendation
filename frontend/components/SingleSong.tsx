import { css, jsx } from "@emotion/react";
import { ReactElement } from "react";

type Props = {
  title: string;
  artist: string;
  img: string;
};

type SingleSong = {
  (props: Props): ReactElement;
};

const SingleSong: SingleSong = ({ title, artist, img }) => {
  return (
    <div css={containerStyle}>
      <div css={imgBlockStyle}>
        <img src={img} />
      </div>

      <div css={blockStyle}>
        <h3 css={titleStyle}>{title}</h3>
        <p css={artistStyle}>{artist}</p>
      </div>

      <button css={btnStyle}>
        <img src="/play3.svg" />
      </button>
    </div>
  );
};

export default SingleSong;

const containerStyle = css`
  height: 100px;
  border-bottom: solid 1px #b9b9b9;
  padding-left: 80px;
  position: relative;
  display: flex;
  flex-shrink: 0;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const blockStyle = css``;

const imgBlockStyle = css`
  width: 72px;
  margin-right: 48px;
  img {
    width: 100%;
  }
`;

const titleStyle = css`
  font-size: 22px;
  color: #121212;
  margin-top: 0;
  margin-bottom: 8px;
`;

const artistStyle = css`
  font-size: 20px;
  color: #939393;
  margin: 0;
`;

const btnStyle = css`
  border: none;
  background: transparent;
  position: absolute;
  right: 55px;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 24px;
    height: 20px;
  }
`;
