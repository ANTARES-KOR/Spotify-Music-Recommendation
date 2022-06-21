import { ReactElement, useEffect, useState } from "react";

type Props = {
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

const WebPlayback: WebPlayback = ({ token }) => {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [device_id, setId] = useState("");

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

  const play = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken },
    },
  }) => {
    getOAuthToken((access_token: string) => {
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    });
  };
  const pause = ({
    playerInstance: {
      _options: { getOAuthToken },
    },
  }) => {
    getOAuthToken((access_token: string) => {
      fetch(
        `https://api.spotify.com/v1/me/player/pause?device_id=${device_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <img
            src={current_track.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>

            <div className="now-playing__artist">
              {current_track.artists[0].name}
            </div>
          </div>
        </div>
        <button
          className="btn-spotify"
          onClick={() => {
            player.previousTrack();
          }}
        >
          &lt;&lt;
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            play({
              playerInstance: player,
              spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
            });
          }}
        >
          PLAY
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            pause({
              playerInstance: player,
            });
          }}
        >
          PAUSE
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.nextTrack();
          }}
        >
          &gt;&gt;
        </button>
      </div>
    </>
  );
};

export default WebPlayback;
