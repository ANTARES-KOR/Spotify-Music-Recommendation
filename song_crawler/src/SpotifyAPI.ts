import "dotenv/config";
import axios from "axios";
import { Buffer } from "node:buffer";
import { SpotifyTokenResponse } from "./types/spotify";

const AuthorizationToken = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

export const getSpotifyAccessToken = async () => {
  try {
    const response = await axios.post<SpotifyTokenResponse>(
      "https://accounts.spotify.com/api/token",
      undefined,
      {
        params: {
          grant_type: "client_credentials",
        },
        headers: {
          Authorization: `Basic ${AuthorizationToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getNewReleases = async ({ offset }: { offset: number }) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
      params: {
        country: "KR",
        // max 50
        limit: 50,
        offset,
      },
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// max 50
export const getSeveralTracks = async ({ trackIds: ids }: { trackIds: string[] }) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/tracks", {
      params: {
        ids: ids.join(","),
        market: "KR",
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// max 100
export const getAudioFeatures = async ({ trackIds: ids }: { trackIds: string[] }) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/audio-features", {
      params: {
        ids: ids.join(","),
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// max 20 ids
export const getAlbums = async ({ albumIds }: { albumIds: string[] }) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/albums", {
      params: {
        ids: albumIds.join(","),
        market: "KR",
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
