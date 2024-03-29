type Props = {
  spotify_uri?: string;
  device_id: string;
  position?: number;
  playerInstance: any;
};

export const play = ({
  spotify_uri,
  device_id,
  position,
  playerInstance: {
    _options: { getOAuthToken },
  },
}: Props) => {
  getOAuthToken((access_token: string) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri], position_ms: position }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};

export const pause = ({
  device_id,
  playerInstance: {
    _options: { getOAuthToken },
  },
}: Props) => {
  getOAuthToken((access_token: string) => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};
