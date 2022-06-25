import SingleSong from "./SingleSong";
import { css, jsx } from "@emotion/react";

const Playlist = ({ onPlay, data }) => {
  return (
    <div css={containerStyle}>
      <div css={headerImage}>
        <h1>My Music</h1>
      </div>
      <div css={songsContainerStyle}>
        {data?.map((info, i) => (
          <SingleSong onPlay={onPlay} key={i} info={info} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const headerImage = css`
  display: flex;
  height: 410px;
  background-image: url("/header.png");
  position: relative;
  h1 {
    color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 200px;
    font-size: 80px;
  }
`;

const songsContainerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 110px;
  overflow: scroll;
`;
