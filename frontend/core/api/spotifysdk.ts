export const play = ({
  spotify_uri,
  device_id,
  playerInstance: {
    _options: { getOAuthToken },
  },
}) => {
  getOAuthToken((access_token: string) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
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
}) => {
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

export const nextTrack = ({
  device_id,
  playerInstance: {
    _options: { getOAuthToken },
  },
}) => {
  getOAuthToken((access_token: string) => {
    fetch(`https://api.spotify.com/v1/me/player/next?device_id=${device_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};

export const addTrack = ({
  spotify_uri,
  device_id,
  playerInstance: {
    _options: { getOAuthToken },
  },
}) => {
  getOAuthToken((access_token: string) => {
    fetch(`https://api.spotify.com/v1/me/player/queue?device_id=${device_id}`, {
      method: "POST",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("add new song");
  });
};

export const getState = ({
  playerInstance: {
    _options: { getOAuthToken },
  },
}) => {
  getOAuthToken((access_token: string) => {
    fetch("https://api.spotify.com/v1/me/player", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer BQCytbnF2WBte_-jXQ9Etj7QI2l7QrX-E1C9mijErRDIvuWdl83ou5VAiKmCpGlk1upHvdYRRpejxp6ACIXlyfJpFbveBqddyG9ypsCJALKqvimTUoJgyCxkStFocMbPFk9jgU8mCciq3CQXox5IiIy3ACH4KW4Fj70oLZ-jaScN9D2BFITBUXMb1-_RTGG1TKeXpZGqBvirWkw`,
      },
    })
      .then((response) => response.body)
      .then((body) => {
        console.log(body);
      });
  });
};
