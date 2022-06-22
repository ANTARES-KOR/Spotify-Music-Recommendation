import "dotenv/config";
import AWS from "aws-sdk";
import * as fs from "fs";
import csv from "csv-parser";

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

// TODO : mode, analysis_url, track_href, uri, type은 빼도 됨

const saveAudioInfos = (audioInfos: AudioInfo[]) => {
  if (isEmpty(audioInfos)) return;

  if (process.env.NODE_ENV === "production") {
  }

  const existingDataset: any[] = [];
  const stream = fs
    .createReadStream(`${__dirname}/../../data/dataset/existing.csv`, {
      encoding: "utf-8",
    })
    // csv 파일을 읽어야 하는데, 데이터를
    .pipe(csv());

  return new Promise((resolve, reject) => {
    stream.on("data", (data) => {
      existingDataset.push(data);
    });
    stream.on("error", (err) => {
      reject(err);
    });
    stream.on("end", () => {
      // 두개의 오브젝트를 한가지 타입으로 통합하여 저장
      saveDataAsJSON([...existingDataset, ...audioInfos], { name: "new.json", type: "dataset" });
      resolve(null);
    });
  });
};

export default saveAudioInfos;
