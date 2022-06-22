import "dotenv/config";
import AWS from "aws-sdk";
import * as fs from "fs";

import { isEmpty } from "lodash";
import { convertObjectArrayToCSV, saveDataAsCSV, saveDataAsJSON } from "utils";

import type { AudioInfo } from "types/spotify";

const Headers = [
  "id",
  "artist_name",
  "track_name",
  "album_name",
  "artist_genre",
  "release_date",
  "artist_popularity",
  "track_popularity",
  "artist_followers",
  "danceability",
  "energy",
  "key",
  "loudness",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "liveness",
  "valence",
  "tempo",
  "duration_ms",
  "time_signature",
];

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY as string,
  secretAccessKey: process.env.S3_SECRET_KEY as string,
});

const parseAudioData = (dataset: any[]) => {
  return dataset.map((item) => ({
    id: item.id,
    artist_name: item.artist_name,
    track_name: item.track_name,
    album_name: item.album_name,
    artist_genre: item.artist_genre,
    release_date: item.release_date,
    artist_popularity: item.artist_popularity,
    track_popularity: item.track_popularity,
    artist_follwers: item.artist_followers,
    danceability: item.danceability,
    energy: item.energy,
    key: item.key,
    loudeness: item.loudeness,
    speechiness: item.speechiness,
    acousticness: item.acousticness,
    instrumentalness: item.instrumentalness,
    liveness: item.liveness,
    valence: item.valence,
    tempo: item.tempo,
    duration_ms: item.duration_ms,
    time_signature: item.time_signature,
    uri: item.uri ?? "",
  }));
};

const saveAudioInfos = (audioInfos: AudioInfo[]) => {
  if (isEmpty(audioInfos)) return;

  if (process.env.NODE_ENV === "production") {
  }

  const existing_data_raw = fs.readFileSync(
    `${__dirname}/../../data/dataset/existing.json`,
    "utf-8"
  );
  const existing_dataset = JSON.parse(existing_data_raw);
  const new_dataset = parseAudioData([...existing_dataset, ...audioInfos]);

  saveDataAsJSON(new_dataset, { name: "new.json", type: "dataset" });
};

export default saveAudioInfos;
