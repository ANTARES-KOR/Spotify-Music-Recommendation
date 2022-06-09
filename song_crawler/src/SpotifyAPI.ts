import "dotenv/config";
import axios from "axios";
import { Buffer } from "node:buffer";
import { SpotifyTokenResponse } from "./types";

const AuthorizationToken = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

export const setSpotifyAccessToken = async () => {
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

    console.log(response.data);

    if (response.status < 300) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getNewReleases = async () => {
  const response = await axios.get("https://api.spotify.com/v1/browse/new-releases");
};
