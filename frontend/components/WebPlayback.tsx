import { ReactElement, useEffect, useState } from "react";
import { css, jsx } from "@emotion/react";

import {
  play,
  pause,
  addTrack,
  nextTrack,
  getState,
} from "../core/api/spotifysdk";
import Player from "./Player";
import Playlist from "./Playlist";

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

const WebPlayback: WebPlayback = ({ uris, token }) => {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [device_id, setId] = useState("");

  const onPlay = () => {
    play({ spotify_uri: uris[0], device_id, playerInstance: player });
  };

  const onPause = () => {
    pause({ device_id, playerInstance: player });
  };
  const onNextTrack = () => {
    nextTrack({ device_id, playerInstance: player });
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
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setId(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        console.log("state", state);

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, [token]);

  return (
    player && (
      <div
        css={css`
          position: relative;
          width: 70%;
          margin: auto;
        `}
      >
        <Playlist />
        <Player
          onPlay={onPlay}
          onPause={onPause}
          onNextTrack={onNextTrack}
          current_track={current_track}
        />
      </div>
    )
  );
};

export default WebPlayback;
