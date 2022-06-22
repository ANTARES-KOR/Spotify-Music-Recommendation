import { writeFileSync } from "fs";
import format from "date-fns/format";
import { sub } from "date-fns";

type SaveDataAsJSON = (data: any, { name, type }: { name: string; type: string }) => void;

export const saveDataAsJSON: SaveDataAsJSON = (data, { name, type }) => {
  const dataAsString = JSON.stringify(data);
  writeFileSync(`${__dirname}/../data/${type}/${name}`, dataAsString);
};

export const saveDataAsCSV = (data: string, { name, type }: { name: string; type: string }) => {
  writeFileSync(`${__dirname}/../data/${type}/${name}`, data);
};

export const getTargetReleaseDate = () => {
  process.env.TZ = "Asia/Seoul";

  const release_date = format(sub(new Date(), { days: 1 }), "yyyy-MM-dd");

  return release_date;
};

const preprocessData = (data: any[]) => {
  return data.map((item, index) => ({
    index,
    id: item.id,
    artist_name: item.artist_name,
    track_name: item.track_name,
    album_name: item.album_name,
    artist_genre: item.artist_genre,
    release_date: item.release_date,
    artist_popularity: item.artist_popularity,
    track_popularity: item.track_popularity,
    artist_followers: item.artist_followers,
    danceability: item.danceability,
    energy: item.energy,
    key: item.key,
    loudness: item.loudness,
    speechiness: item.speechiness,
    acousticness: item.acousticness,
    instrumentalness: item.instrumentalness,
    liveness: item.liveness,
    valence: item.valence,
    tempo: item.tempo,
    duration_ms: item.duration_ms,
    time_signature: item.time_signature,
  }));
};

export const convertObjectArrayToCSV = (raw_data: any[]) => {
  const processed_data = preprocessData(raw_data);
  const keys = Object.keys(processed_data[0]);
  const values = processed_data.map((item) => Object.values(item));
  const csvString = [keys.join(","), ...values.map((value) => value.join(","))].join("\n");
  return csvString;
};
