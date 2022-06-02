import axios from "axios";
import dotenv from "dotenv";

const getNewReleases = async (offset: number, accessToken: string) => {
  const url = "https://api.spotify.com/v1/browse/new-releases";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      country: "KR",
      limit: 50,
      offset,
    },
  };
  const response = await axios.get(url, config);
  return response.data.albums.items;
};

const getAudioAnalysis = async (id: string, accessToken: string) => {
  const url = `https://api.spotify.com/v1/audio-analysis/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios.get(url, config);
  return response.data;
};

const getGenreSeeds = async (accessToken: string) => {
  const url = "https://api.spotify.com/v1/recommendations/available-genre-seeds";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios.get(url, config);
  return response.data.genres;
};

const SpotifyAPI = {
  getAudioAnalysis,
  getGenreSeeds,
  getNewReleases,
};

export default SpotifyAPI;
