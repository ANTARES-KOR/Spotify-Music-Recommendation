import "dotenv/config";
import axios from "axios";
import { Buffer } from "node:buffer";
import { SpotifyTokenResponse } from "../types/spotify";
import { AlbumTracksResponse, ArtistsResponse, AudioFeaturesResponse, Track } from "./types";

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
    const response = await axios.get<AudioFeaturesResponse>(
      "https://api.spotify.com/v1/audio-features",
      {
        params: {
          ids: ids.join(","),
        },
      }
    );
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

export const getAlbumTracks = async ({ albumId }: { albumId: string }) => {
  try {
    const response = await axios.get<AlbumTracksResponse>(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        params: {
          market: "KR",
          limit: 50,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getAudioFeaturesForTracks = async ({ trackIds }: { trackIds: string[] }) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/audio-features", {
      params: {
        ids: trackIds.join(","),
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getArtists = async ({ artistIds }: { artistIds: string[] }) => {
  try {
    const response = await axios.get<ArtistsResponse>("https://api.spotify.com/v1/artists", {
      params: {
        ids: artistIds.join(","),
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getTrack = async ({ trackId }: { trackId: string }) => {
  try {
    const response = await axios.get<Track>(`https://api.spotify.com/v1/tracks/${trackId}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
