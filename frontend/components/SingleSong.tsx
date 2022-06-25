import { css, jsx } from "@emotion/react";
import { ReactElement, useEffect } from "react";

type Props = {
  title: string;
  artist: string;
  img: string;
};

type SingleSong = {
  (props: Props): ReactElement;
};

const SingleSong: SingleSong = ({ info, onPlay }) => {
  const { track_name, artist_name, album_image, uri, duration_ms } = info;
  const onClick = () => {
    onPlay(uri, true);
  };
  const convertTime = (ms: number) => {
    const min = Math.floor(ms / 1000 / 60);
    const sec = Math.floor((ms / 1000) % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  useEffect(() => {
    console.log(info)
  }, [info]);

  return (
    <div css={containerStyle}>
      <div css={imgBlockStyle}>
        <img src={album_image} />
      </div>

      <div css={blockStyle}>
        <h3 css={titleStyle}>{track_name}</h3>
        <p css={artistStyle}>{artist_name}</p>
      </div>
      <div css={sideBlockStyle} className="side-block">
        <p>{convertTime(duration_ms)}</p>
        <button
          onClick={() => {
            onClick();
          }}
        >
          <img src="/play3.svg" />
        </button>
      </div>
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
  background-color: #ffffff;

  div {
    display: flex;
    justify-content: center;
  }
`;

const blockStyle = css`
  flex-direction: column;
`;

const imgBlockStyle = css`
  flex-direction: column;
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

const sideBlockStyle = css`
  position: absolute;
  display: flex;
  flex-direction: row;
  right: 55px;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 24px;
    height: 20px;
  }
  p {
    color: #e74c3c;
    font-weight: 300;
  }
`;
