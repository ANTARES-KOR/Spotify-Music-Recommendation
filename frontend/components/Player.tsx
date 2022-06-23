import { css, jsx } from "@emotion/react";

const Player = ({ onPlay, onPause, onNextTrack, current_track }) => {
  return (
    <div css={containerStyle}>
      <div css={imgContainerStyle}>
        <img src={current_track.album.images[0].url} />
      </div>
      <div>
        <div>{current_track.name}</div>
        <div>{current_track.artists[0].name}</div>
      </div>
      <div css={btnsContainerStyle}>
        <button className="btn-change">
          <img src="/previous2.svg" />
        </button>
        <button onClick={onPlay} className="btn-play">
          <div
            css={css`
              width: 58px;
              height: 58px;
              background: #ffffff;
              box-shadow: 2px 3px 4px #00000029;
              border: 1px solid #eaeaea;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <img src="/play3.svg" />
          </div>
        </button>
        <button onClick={onNextTrack} className="btn-change">
          <img src="/next2.svg" />
        </button>
      </div>
    </div>
  );
};

export default Player;

const containerStyle = css`
  display: flex;
  align-items: center;
  height: 110px;
  width: 100%;
  position: absolute;
  background-color: white;
  bottom: 0;
  box-shadow: -3px 0px 6px #00000029;
`;

const imgContainerStyle = css`
  width: 86px;
  height: 86px;
  margin-right: 32px;
  margin-left: 80px;
  img {
    height: 100%;
  }
`;

const btnsContainerStyle = css`
  display: flex;
  justify-content: center;
  height: 100%;
  position: absolute;
  right: 150px;

  button {
    background-color: transparent;
    border: none;
  }

  .btn-play {
    div {
      img {
        height: 27px;
      }
    }
  }

  .btn-change {
    img {
      height: 20px;
    }
  }
`;
