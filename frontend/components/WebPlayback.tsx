import { ReactElement, useEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { play, pause, addTrack, nextTrack } from "../core/api/spotifysdk";
import Player from "./Player";
import Playlist from "./Playlist";
import { useRouter } from "next/router";
import { useToken } from "../context/TokenContext";

type Props = {
  uris: string[];
  token: string;
};

type WebPlayback = {
  (props: Props): ReactElement;
};

type Track = {
  name: string;
  album: {
    images: [{ url: string }];
  };
  artists: [{ name: string }];
};

const track: Track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const WebPlayback: WebPlayback = ({ data }) => {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [is_ready, setReady] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [current_position, setPosition] = useState(0);
  const [device_id, setId] = useState("");
  const token = useToken();
  const router = useRouter();

  const onPlay = (uri: string | undefined, is_new: boolean) => {
    if (uri === undefined) {
      play({
        spotify_uri: data[0].uri,
        device_id,
        position: current_position,
        playerInstance: player,
      });
    }
    play({
      spotify_uri: uri,
      device_id,
      position: is_new ? 0 : current_position,
      playerInstance: player,
    });
  };

  const onPause = () => {
    pause({ device_id, playerInstance: player });
  };

  const onNextTrack = () => {
    addTrack({
      spotify_uri: "spotify:track:5m2tbM2w8mG76uwFgla2iF",
      device_id,
      playerInstance: player,
    }).then(() => {
      nextTrack({ device_id, playerInstance: player });
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: any) => {
          // Run code to get a fresh access token
          console.log("oauth token", token);
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setId(device_id);
        setReady(true);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        console.log("state changed", state);

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setPosition(state.position);
      });

      player.connect();
    };
  }, [token]);

  return (
    is_ready &&
    player && (
      <div
        css={css`
          background-color: #ecf0f1;
          position: relative;
        `}
      >
        <div
          css={css`
            background-image: url("./logo.png");
            background-size: cover;
            background-position: center;
            width: 125px;
            height: 37.5px;
            position: absolute;
            left: 22px;
            top: 28px;
          `}
        />
        <button
          onClick={() => {
            router.replace("/login");
          }}
          css={css`
            color: #555555;
            position: absolute;
            left: 32px;
            bottom: 40px;
            font-size: 18px;
          `}
        >
          Logout
        </button>
        <div
          css={css`
            position: relative;
            width: 75%;
            max-width: 1341px;
            margin: auto;
          `}
        >
          <Playlist onPlay={onPlay} data={data} />
          <Player
            onPlay={onPlay}
            onPause={onPause}
            is_paused={is_paused}
            onNextTrack={onNextTrack}
            current_track={current_track}
          />
        </div>
      </div>
    )
  );
};

export default WebPlayback;
