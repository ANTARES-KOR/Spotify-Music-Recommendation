import "dotenv/config";
import AWS from "aws-sdk";
import * as fs from "fs";
import csv from "csv-parser";

import { isEmpty } from "lodash";
import { convertObjectArrayToCSV, saveDataAsCSV, saveDataAsJSON } from "utils";

import type { AudioInfo } from "types/spotify";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY as string,
  secretAccessKey: process.env.S3_SECRET_KEY as string,
});

// TODO : mode, analysis_url, track_href, uri, type은 빼도 됨

const saveAudioInfos = (audioInfos: AudioInfo[]) => {
  if (isEmpty(audioInfos)) return;

  const existingDataset: any[] = [];
  const stream = fs
    .createReadStream(`${__dirname}/../../data/dataset/existing.csv`, {
      encoding: "utf-8",
    })
    .pipe(csv());

  return new Promise((resolve, reject) => {
    stream.on("data", (data) => {
      console.log(data);
      existingDataset.push(data);
    });
    stream.on("error", (err) => {
      reject(err);
    });
    stream.on("end", () => {
      // 두개의 오브젝트를 한가지 타입으로 통합하여 저장
      const csvString = convertObjectArrayToCSV([...existingDataset, ...audioInfos]);
      saveDataAsCSV(csvString, { name: "new.csv", type: "dataset" });
      resolve(null);
    });
  });
};

export default saveAudioInfos;
