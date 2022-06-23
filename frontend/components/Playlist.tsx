import SingleSong from "./SingleSong";
import { css, jsx } from "@emotion/react";

const Playlist = ({}) => {
  const songs = [
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
    { title: "The Bones", artist: "Maren Morris", img: "/pause2.svg" },
  ];
  return (
    <div css={containerStyle}>
      <div css={headerImage} />
      <div css={songsContainerStyle}>
        {songs.map((info, i) => (
          <SingleSong
            key={i}
            title={info.title}
            artist={info.artist}
            img={info.img}
          />
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
`;

const songsContainerStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 110px;

  overflow: scroll;
`;
