import { css, jsx } from "@emotion/react";

const Player = ({ onPlay, onPause, is_paused, onNextTrack, current_track }) => {
  console.log("player component rerendered");
  console.log("paused? ", is_paused);
  console.log(current_track);

  return (
    <div css={containerStyle}>
      <div css={imgContainerStyle}>
        <img src={current_track?.album.images[0]?.url} />
      </div>
      <div>
        <h3 css={titleStyle}>{current_track?.name}</h3>
        <p css={artistStyle}>{current_track?.artists[0].name}</p>
      </div>
      <div css={btnsContainerStyle}>
        <button className="btn-change">
          <img src="/previous2.svg" />
        </button>
        {is_paused ? (
          <button className="btn-play">
            <div>
              <img
                src="/play3.svg"
                onClick={() => {
                  onPlay(current_track?.uri);
                }}
              />
            </div>
          </button>
        ) : (
          <button className="btn-play">
            <div>
              <img
                src="/pause2.svg"
                onClick={() => {
                  onPause();
                }}
              />
            </div>
          </button>
        )}
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
  z-index: 10;
`;

const imgContainerStyle = css`
  width: 86px;
  height: 86px;
  margin-right: 32px;
  margin-left: 80px;
  box-shadow: 2px 2px 5px #00000029;
  img {
    height: 100%;
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

const btnsContainerStyle = css`
  display: flex;
  justify-content: center;
  height: 100%;
  position: absolute;
  right: 150px;

  .btn-play {
    div {
      width: 58px;
      height: 58px;
      background: #ffffff;
      box-shadow: 2px 3px 4px #00000029;
      border: 1px solid #eaeaea;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
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
